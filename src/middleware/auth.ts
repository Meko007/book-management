import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../models/userModel';
import 'dotenv/config';

const secret = process.env.JWT_SECRET as string;

export interface customReq extends Request {
    token: string | JwtPayload;
}

export const createToken = (user: IUser) => {
	const token = jwt.sign({
		userId: user._id,
		email: user.email,
		role: user.role, 
		suspended: user.suspended,
	}, secret, { expiresIn: '365d' });
	return token;
};

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];
    
		if (!token) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
        
		const decodedToken = jwt.verify(token, secret);
		(req as customReq).token = decodedToken;
		next();
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error' });
		console.error(error);
	}
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = (req as customReq).token;
	
		// if (user && (user as JwtPayload).role === 'admin') {
		// 	next();
		// } else {
		// 	res.status(403)
		// }
	
		user && (user as JwtPayload).role === 'admin'
			? next()
			: res.status(403).json({ message: 'Admin access required' });
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error' });
		console.error(error);
	}
};

export const isSuspended = (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = (req as customReq).token;

		user && (user as JwtPayload).suspended
			? res.status(403).json({ message: 'Your account has been suspended' })
			: next();
	} catch (error) {
		res.status(500).json({ message: 'Internal Server Error' });
		console.error(error);
	}
};