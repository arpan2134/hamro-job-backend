from django.shortcuts import render
from django.utils import timezone

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Avg, Min, Max, Count
from rest_framework.pagination import PageNumberPagination

from rest_framework.permissions import IsAuthenticated

from .serializers import JobSerializer, CandidatesAppliedSerializer
from .models import Job, CandidatesApplied

from django.shortcuts import get_object_or_404
from .filters import JobsFilter


# Create your views here.
#get all job

@api_view(['GET'])
def getAllJobs(request):
    filterset = JobsFilter(request.GET, queryset=Job.objects.all().order_by('id'))

    count = filterset.qs.count()

    # Pagination
    resPerPage = 3

    paginator = PageNumberPagination()
    paginator.page_size = resPerPage

    queryset = paginator.paginate_queryset(filterset.qs, request)

    serializer = JobSerializer(queryset, many=True)
    return Response({
        "count": count,
        "resPerPage": resPerPage,
        'jobs': serializer.data
    })

#get job

@api_view(['GET'])
def getJob(request, pk):
    job = get_object_or_404(Job, id=pk)

    candidates = job.candidatesapplied_set.all().count()

    serializer = JobSerializer(job, many=False)

    return Response({'job': serializer.data, 'candidates': candidates})

#new job
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def newJob(request):
    request.data['user'] = request.user
    data = request.data

    job = Job.objects.create(**data)

    serializer = JobSerializer(job, many=False)
    return Response(serializer.data)

#updaye job
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateJob(request, pk):
    job = get_object_or_404(Job, id=pk)

    if job.user != request.user:
        return Response({'message': 'You can not update this job'}, status=status.HTTP_403_FORBIDDEN)

    job.title = request.data['title']
    job.description = request.data['description']
    job.email = request.data['email']
    job.address = request.data['address']
    job.jobType = request.data['jobType']
    job.education = request.data['education']
    job.industry = request.data['industry']
    job.experience = request.data['experience']
    job.salary = request.data['salary']
    job.positions = request.data['positions']
    job.company = request.data['company']

    job.save()

    serializer = JobSerializer(job, many=False)

    return Response(serializer.data)

#delete job
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteJob(request, pk):
    job = get_object_or_404(Job, id=pk)

    if job.user != request.user:
        return Response({'message': 'You can not delete this job'}, status=status.HTTP_403_FORBIDDEN)

    job.delete()

    return Response({'message': 'Job is Deleted.'}, status=status.HTTP_200_OK)

#get topic stats
@api_view(['GET'])
def getTopicStats(request, topic):
    args = {'title__icontains': topic}
    jobs = Job.objects.filter(**args)

    if len(jobs) == 0:
        return Response({'message': 'Not stats found for {topic}'.format(topic=topic)})

    stats = jobs.aggregate(
        total_jobs=Count('title'),
        avg_positions=Avg('positions'),
        avg_salary=Avg('salary'),
        min_salary=Min('salary'),
        max_salary=Max('salary')
    )

    return Response(stats)

#apply to job
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def applyToJob(request, pk):
    user = request.user
    job = get_object_or_404(Job, id=pk)

    if user.userprofile.resume == '':
        return Response({'error': 'Please upload your resume first'}, status=status.HTTP_400_BAD_REQUEST)
    if job.lastDate < timezone.now():
        return Response({'error': 'You can not apply to this job. Job is expired'}, status=status.HTTP_400_BAD_REQUEST)

    alreadyApplied = job.candidatesapplied_set.filter(user=user).exists()

    if alreadyApplied:
        return Response({'error': 'You have already applied to this job'}, status=status.HTTP_400_BAD_REQUEST)

    if job.user.id == user.id:
        return Response({'error': 'You cannot apply to a job that you have created'}, status=status.HTTP_400_BAD_REQUEST)

    jobApplied = CandidatesApplied.objects.create(
        job=job,
        user=user,
        resume=user.userprofile.resume
    )

    return Response({
        'applied': True,
        'job_id': jobApplied.id
    },
        status=status.HTTP_200_OK
    )

#get current user applied job
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCurrentUserAppliedJobs(request):
    args = {'user_id': request.user.id}

    jobs = CandidatesApplied.objects.filter(**args)

    serializer = CandidatesAppliedSerializer(jobs, many=True)

    return Response(serializer.data)

#applied
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def isApplied(request, pk):
    user = request.user
    job = get_object_or_404(Job, id=pk)

    applied = job.candidatesapplied_set.filter(user=user).exists()

    return Response(applied)

#getcurrent user applied job
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCurrentUserJobs(request):
    args = {'user': request.user.id}

    jobs = Job.objects.filter(**args)
    serializer = JobSerializer(jobs, many=True)

    return Response(serializer.data)

 #get candidateapplied
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getCandidatesApplied(request, pk):
    user = request.user
    job = get_object_or_404(Job, id=pk)

    if job.user != user:
        return Response({'error': 'You can not access this job'}, status=status.HTTP_403_FORBIDDEN)

    candidates = job.candidatesapplied_set.all()

    serializer = CandidatesAppliedSerializer(candidates, many=True)

    return Response(serializer.data)