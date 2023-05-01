import Layout from "@/components/layout/Layout";
import JobCandidates from "@/components/job/JobCandidates";
import axios from "axios";
import NotFound from "@/components/layout/NotFound";
import { isAuthenticatedUser } from "@/utils/isAuthenticated";


export default function JobCandidatesPage({ candidatesApplied, error }) {

  if(error?.includes('Not found')) return <NotFound />;

  return (
    <Layout title='Job Candidates'>
     <JobCandidates candidatesApplied={candidatesApplied} />
    </Layout>
  );
}

export async function getServerSideProps({ req, params }) {

    const access_token = req.cookies.access;

    const user = await isAuthenticatedUser(access_token);
  
    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  

  try {
   
    const res = await axios.get(`http://127.0.0.1:8000/api/job/${params.id}/candidates/`, {
      headers: {
          Authorization: `Bearer ${access_token}`
      }
  
    })
  
    const candidatesApplied = res.data

    return {
      props: {
        candidatesApplied
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

