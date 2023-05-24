import axios from "axios";
import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/router";



const AuthContext = createContext();

export const Authprovider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [error, setError] = useState(null);
    const [updated, setUpdated] = useState(null);
    const [uploaded, setUploaded] = useState(null);;

    
    const router = useRouter();


    useEffect(() => {
      console.log(user);
        if (!user) {
            loadUser();
        }
    }, [user]);


    //login user
    const login = async ({ username, password }) => {
        try {
          setLoading(true);
    
          const res = await axios.post("/api/auth/login", {
            username,
            password,
          });

        if(res.data.success) {
            loadUser();
            setIsAuthenticated(true);
            setLoading(false);
            router.push('/');
        };

        } catch (error) {
            setLoading(false);
            setError(
                error.response && 
                (error.response.data.detail || error.response.data.error)
            );
        }
    };

    //load user
    const loadUser = async () => {
      try {
        setLoading(true);
  
        const res = await axios.get("/api/auth/user");

      if(res.data.user) {
          loadUser();
          setIsAuthenticated(true);
          setLoading(false);
          setUser(res.data.user)
      };

      } catch (error) {
          setLoading(false);
          setIsAuthenticated(false);
          setUser(null);
          setError(
              error.response && 
              (error.response.data.detail || error.response.data.error)
          );
      }
  };


    //register user
    const register = async ({ firstName, lastName, email, password }) => {
        try {
          setLoading(true);
    
          const res = await axios.post(`http://127.0.0.1:8000/api/register/`, {
            first_name: firstName,
            last_name: lastName,
            email,
            password,
          });

    
          if (res.data.message) {
            setLoading(false);
            router.push("/login");
          }
        } catch (error) {
          console.log(error.response);
          setLoading(false);
          setError(
            error.response &&
              (error.response.data.detail || error.response.data.error)
          );
        }
      };


       //update user
    const UpdateProfile = async ({ firstName, lastName, email, password }, access_token) => {
      try {
        setLoading(true);
  
        const res = await axios.put(`http://127.0.0.1:8000/api/me/update/`, {
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        }, {
          headers: {
            Authorization: `Bearer ${access_token} `
          },
        }

        );

  
        if (res.data) {
          setLoading(false);
          setUpdated(true)
          setUser(res.data)
        }
      } catch (error) {
        console.log(error.response);
        setLoading(false);
        setError(
          error.response &&
            (error.response.data.detail || error.response.data.error)
        );
      }
    };

     //upload Resume....cv
     const uploadResume = async ( formData, access_token) => {
      try {
        setLoading(true);
  
        const res = await axios.put(`http://127.0.0.1:8000/api/upload/resume/`, 
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (res.data) {
        setLoading(false);
        setUploaded(true);
      }
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };

    // Logout user
  const logout = async () => {
    try {
      const res = await axios.post("/api/auth/logout");

      if (res.data.success) {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      setLoading(false);
      setIsAuthenticated(false);
      setUser(null);
      setError(
        error.response &&
          (error.response.data.detail || error.response.data.error)
      );
    }
  };


  //clear erroorrss
  const clearErrors = () => {

    setError(null);
  }




  return (

    <AuthContext.Provider

      value={{
        loading,
        user,
        error,
        isAuthenticated,
        updated,
        uploaded,
        login,
        register,
        UpdateProfile,
        logout,
        setUpdated,
        setUploaded,
        uploadResume,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;