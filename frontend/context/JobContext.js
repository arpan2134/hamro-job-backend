import axios from "axios";
import { useState, createContext } from "react";



const JobContext  = createContext();

export const JobProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [created, setCreated] = useState(null);
    const [updated, setUpdated] = useState(null);
    const [deleted, setDeleted] = useState(null);
    const [applied, setApplied] = useState(false);
    const [stats, setStats] = useState(false);


      // Create a new job
  const newJob = async (data, access_token) => {
    try {
      setLoading(true);

      const res = await axios.post(`http://127.0.0.1:8000/api/jobs/new/`, 
        data,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      if (res.data) {
        setLoading(false);
        setCreated(true);
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };


  // update job
  const updateJob = async (id, data, access_token) => {
    try {
      setLoading(true);

      const res = await axios.put(`http://127.0.0.1:8000/api/jobs/${id}/update/`, 
        data,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (res.data) {
        setLoading(false);
        setUpdated(true);
      }
    } catch (error) {
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };




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

    
    //delete job 
    const deleteJob = async ( id, access_token) => {
      try {
        setLoading(true);
  
        const res = await axios.delete(`http://127.0.0.1:8000/api/jobs/${id}/delete/`, 
        
        
        {
          headers: {
            Authorization: `Bearer ${access_token} `
          },
        }

        );

        setLoading(false);
        setDeleted(true);
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
                created,
                updated,
                deleted,
                applied,
                stats,
                newJob,
                updateJob,
                deleteJob,
                getTopicStats,
                applyToJob,
                setUpdated,
                checkJobApplied,
                setCreated,
                setDeleted,
                clearErrors,
                
            }}

        >
            {children}
        </JobContext.Provider>
    );



}

export default JobContext;