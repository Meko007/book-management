import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../models/userModel';
import 'dotenv/config';

const secret = process.env.JWT_SECRET as string;

interface customReq extends Request {
    token: string | JwtPayload;
}

export const createToken = (user: IUser) => {
	const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '365d' });
	return token;
};

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];
    
		if (!token) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
        
		const decodedToken = jwt.verify(token, secret) as JwtPayload;
		(req as customReq).token = { userId: decodedToken.userId };
		next();
	} catch (error) {
		res.status(401).json({ message: 'Unauthorized' });
		console.error(error);
	}
};