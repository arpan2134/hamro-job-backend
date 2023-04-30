import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";


const JobContext  = createContext();

export const JobProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [updated, setUpdated] = useState(null);
    const [applied, setApplied] = useState(false);
    const [stats, setStats] = useState(false);



    const router = useRouter();




    //apply to jobs
    const applyToJob = async ( id, access_token) => {
        try {
          setLoading(true);
    
          const res = await axios.post(`http://127.0.0.1:8000/api/jobs/${id}/apply/`, 
          {},
          
          {
            headers: {
              Authorization: `Bearer ${access_token} `
            },
          }
  
          );
  
    
          if (res.data.applied === true ) {
            setLoading(false);
            setApplied(true);
          }
        } catch (error) {
          setLoading(false);
          setError(
            error.response &&
              (error.response.data.detail || error.response.data.error)
          );
        }
      };


      
    //lets Get topic stats
    const getTopicStats = async (topic) => {
      try {
        setLoading(true);
  
        const res = await axios.get(`http://127.0.0.1:8000/api/stats/${topic}/`,
        


        );

        console.log(res.data);

          setLoading(false);
          setStats(res.data);
        
      } catch (error) {
        setLoading(false);
        setError(
          error.response &&
            (error.response.data.detail || error.response.data.error)
        );
      }
    };


    //check jobs applied or not
    const checkJobApplied = async ( id, access_token) => {
      try {
        setLoading(true);
  
        const res = await axios.get(`http://127.0.0.1:8000/api/jobs/${id}/check/`,
        {
          headers: {
            Authorization: `Bearer ${access_token} `
          },
        }

        );

        console.log(res.data);

          setLoading(false);
          setApplied(res.data);
        
      } catch (error) {
        setLoading(false);
        setError(
          error.response &&
            (error.response.data.detail || error.response.data.error)
        );
      }
    };
  


    //clear erroorrss
    const clearErrors = () => {

        setError(null);
    };

    return (

        <JobContext.Provider

            value={{
                loading,
                error,
                updated,
                applied,
                stats,
                getTopicStats,
                applyToJob,
                setUpdated,
                checkJobApplied,
                clearErrors,
                
            }}

        >
            {children}
        </JobContext.Provider>
    );



}

export default JobContext;