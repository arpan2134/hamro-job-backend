import Layout from "../../components/layout/Layout";
import axios from "axios";


export default function JobDetailsPage({ job }) {
    console.log(job);

  return (
    <Layout>
     <h1>Job Details</h1>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {

    const res = await axios.get(`http://127.0.0.1:8000/api/jobs/{params.id}/`);
    const job = res.data;

    return{
        props: {
            job
        }
    }
    


}