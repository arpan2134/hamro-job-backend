import Layout from "../../components/layout/Layout";
import JobDetails from "../../components/job/JobDetails";
import axios from "axios";
import NotFound from "@/components/layout/NotFound";


export default function JobDetailsPage({ job, candidates, access_token, error }) {

  if(error?.includes('Not found')) return <NotFound />;

  return (
    <Layout title={job.title}>
     <JobDetails job={job} candidates={candidates} access_token={access_token} />
    </Layout>
  );
}

export async function getServerSideProps({ req, params }) {

  try {
    console.log(params.id);
    const res = await axios.get(`http://127.0.0.1:8000/api/jobs/${params.id}/`);

    console.log(res.data);
  
    const job = res.data.job;
    const candidates = res.data.candidates;

    const access_token = req.cookies.access || '';  

    return {
      props: {
        job,
        candidates,
        access_token
      },
    };
    
  } catch (error) {
    return {
      props: {
        error: error.response.data.detail,
      },
    };
  }
}

