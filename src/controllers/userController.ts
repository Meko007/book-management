import { Request, Response } from 'express';
import UserModel from '../models/userModel';
import BookModel from '../models/bookModel';
import { createToken } from '../middleware/auth';
import { validationResult, check } from 'express-validator';
import BlacklistModel from '../models/blacklistModel';
import bcrypt from 'bcrypt';
import { customReq } from '../middleware/auth';
import { JwtPayload } from 'jsonwebtoken';
import { emailAddress, transporter, random } from '../utils/util';

export const registerUser = async (req: Request, res: Response) => {
	try {
		await Promise.all([
			check('firstName').isString().isAlpha().trim().escape().notEmpty().run(req),
			check('lastName').isString().isAlpha().trim().escape().notEmpty().run(req),
			check('email').isEmail().trim().escape().notEmpty().run(req),
			check('password').isString().notEmpty().run(req),
		]);

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { firstName, lastName, email, password } = req.body;
		const userExists = await UserModel.findOne({ email });

		if (userExists) {
			return res.status(409).json({ message: `User with email ${email} already exists` });
		}

		await UserModel.create({
			firstName,
			lastName,
			email,
			authentication: { password },
			// role: 'admin',
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

			await UserModel.findByIdAndUpdate(user._id, { $set: { 'authentication.jwtToken': token } });

			res.status(200).json({
				token,
				expiresIn: '24hrs' 
			});
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

export const updateUser = async (req: Request, res: Response) => {  
	try {
		const { id } = req.params;
		const { role, suspended } = req.body;
		const user = await UserModel.findById(id);

		if (!user) {
			return res.status(404).json({ message: `book with the id ${id} wasn't found` });
		}

		const updatedUser = await UserModel.findByIdAndUpdate(
			id,
			{ role, suspended },
			{ new: true }
		);
		res.status(200).json(updatedUser);
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

export const logoutUser = async (req: Request, res: Response) => {
	try {
		const token = req.headers.authorization?.split(' ')[1];

		if (token) {
			const expiredAt = new Date();
			await BlacklistModel.create({ token, expiredAt });
		}

		res.status(200).json({ message: 'Logout successful' });
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
		console.error(error);
	}
};

export const forgotPassword = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		const user = await UserModel.findOne({ email });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// const resetToken = crypto.randomUUID();
		const resetToken = random(10);

		await UserModel.findByIdAndUpdate((user)._id, { $set: { 'resetToken': resetToken } });

		const mailOptions = {
			from: emailAddress,
			to: email,
			subject: 'Password Reset Token',
			text: `Copy this token: ${resetToken}`,
		};

		await transporter.sendMail(mailOptions);
		res.status(200).json({ message: 'Password reset token sent' });
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
		console.error(error);
	}
};

export const resetPassword = async (req: Request, res: Response) => {
	try {
		const { resetToken, newPassword } = req.body;
		const user = await UserModel.findOne({ resetToken });

		if (!user) {
			return res.status(404).json({ message: 'Invalid or expired reset token' });
		}

		user.authentication.password = newPassword;
		await user.save();

		await UserModel.findByIdAndUpdate(user._id, { $set: { 'resetToken': null } });
		res.status(200).json({ message: 'Password reset successful' });
	} catch (error) {
    	res.status(500).json({ error: 'Internal Server Error' });
		console.error(error);
	}
};

export const viewFavourites = async (req: Request, res: Response) => {
	try {
		const id = ((req as customReq).token as JwtPayload).userId;
		const user = await UserModel.findById(id);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		const favourites = user.favourites;

		const faveBooks = await Promise.all(
			favourites.map(async (bookId) => {
				const book = await BookModel.findById(bookId, '-_id -favouritedBy -createdAt -updatedAt -__v');
				return book;
			})
		);

		res.status(200).json(faveBooks);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
		console.error(error);
	}
};