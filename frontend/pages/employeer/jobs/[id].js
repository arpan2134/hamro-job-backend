import Layout from "@/components/layout/Layout";
import UpdateJob from "@/components/job/UpdateJob";
import axios from "axios";
import NotFound from "@/components/layout/NotFound";
import { isAuthenticatedUser } from "@/utils/isAuthenticated";


export default function UpdateJobPage({ job, access_token, error }) {

  if(error?.includes('Not found')) return <NotFound />;

  return (
    <Layout title='Job Candidates'>
     <UpdateJob job={job} access_token={access_token} />
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
   
    const res = await axios.get(`http://127.0.0.1:8000/api/jobs/${params.id}/`, 
  
    );
  
    const job = res.data.job

    return {
      props: {
        job,
        access_token,
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

 