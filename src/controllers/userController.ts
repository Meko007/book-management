import { Request, Response } from 'express';
import UserModel, { IUser } from '../models/userModel';
import { createToken } from '../middleware/auth';
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		const userExists = await UserModel.findOne({ email });

		if (userExists) {
			return res.status(409).json({ message: `User with email ${email} already exists` });
		}

		const newUser: IUser = await UserModel.create({
			firstName,
			lastName,
			email,
			authentication: { password },
		});
		res.status(201).json({
			firstName, 
			lastName, 
			email 
		});
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
		console.error(error);
	}
};

export const loginUser = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;

		const user = await UserModel.findOne({ email }).select('+authentication.password');

		if (!user) {
			return res.status(401).json({ message: 'Invalid email or password' });
		}

		if (user && (await bcrypt.compare(password, user.authentication.password))) {
			const token = createToken(user);
			user.authentication.jwtToken = token;

			res.status(200).json({ token });
		} else {
			return res.status(401).json({ message: 'Invalid email or password' });
		}
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
		console.error(error);
	}
};

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await UserModel.find(req.query);
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
		console.error(error);
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try { 
		const { id } = req.params;
		const user = await UserModel.findByIdAndDelete(id);

		if (!user) {
			return res.status(404).json({ message: `user with id ${id} wasn't found` });
		}
		res.status(200).json({
			message: 'deleted',
			user
		});
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
		console.error(error);
	}
};