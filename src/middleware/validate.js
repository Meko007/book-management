import jwt from 'jsonwebtoken';

export const validateToken = async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                res.status(401);
                throw new Error('User is not authorized');
            }
            req.user = decoded.user;
            next();
        });
        if(!token){
            res.status(400);
            throw new Error('User is not authorized or token is missing')
        }
    }
};

export const isEmail = email => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
};

export const restrict = role => {
    return (req, res, next) => {
        if(req.user.role !== role){
            res.status(403);
            throw new Error(`Access denied: User with the ${role} role can't access this route`);
        }
        next();
    }
};