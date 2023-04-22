import axios from "axios";
import cookie from 'cookie'


///token for log

export default async (req, res) => {
    if(req.method === 'POST') {
        const { username, password } = req.body;



        try {

            const response = await axios.post(`http://127.0.0.1:8000/api/token/`,
             {

                username,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            );

            if(response.data.access) {
                res.setHeader('Set-Cokkie',[
                    cookie.serialize('access', response.data.access,{
                        httpOnly: true,
                        Secure: process.env.NODE_ENV !== 'development',
                        maxAge: 60 * 60 * 24 * 15,
                        sameSite: 'Lax',
                        path: "/",
                    }),
                ]);


                return res.status(200).json({
                    success: true,
                });

            } else {
                res.status(response.status).json({
                    error: 'Authentication failed',
                })
            }
            
        } catch (error) {
            res.status(500).json({
                error: error.response && error.response.data.detail,
            })
        }





    }
}