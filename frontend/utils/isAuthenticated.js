import axios from "axios";


export const isAuthenticatedUser = async (access_token) => {
    try {

        const response = await axios.post(`http://127.0.0.1:8000/api/token/verify/`,
         {
            token: access_token
        }
        
        );

        if(response.status === 200) return true;
        return false

    } catch(error) {
        return false
    }
};