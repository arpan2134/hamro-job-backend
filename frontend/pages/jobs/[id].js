import Layout from "../../components/layout/Layout";
import JobDetails from "../../components/job/JobDetails";
import axios from "axios";
import NotFound from "@/components/layout/NotFound";


export default function JobDetailsPage({ job, candidates, error }) {

  if(error?.includes('Not found')) return <NotFound />;

  return (
    <Layout title={job.title}>
     <JobDetails job={job} candidates={candidates}/>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {

  try {

    const res = await axios.get(`http://127.0.0.1:8000/api/jobs/${params.id}`);
  
    const job = res.data.job;
    const candidates = res.data.candidates

    return{
        props: {
            job,
            candidates
        },
    };
    
  } catch (error) {
    return {
      props: {
        error: error.response.data.detail
      }
    }
  }
    
}