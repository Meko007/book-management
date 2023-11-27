import jwt from 'jsonwebtoken';

export const validateToken = async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization;
    if(authHeader){
        token = authHeader;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) =>{
            if(err){
                res.status(401);
                throw new Error("User is not authorized");
            }
        });
    }
};