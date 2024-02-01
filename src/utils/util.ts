import nodemailer from 'nodemailer';
import 'dotenv/config';

export const random = (length: number): string => {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return result;
};

export const isEmail = (email: string): boolean => 
	(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email);

export const capitalizeName = (name: string): string => {
	return name
		.split(/\s+/)
		.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
};

// Sanitize text inputs
export const sanitizeText = (text: string): boolean => /^[A-Za-z]+$/.test(text);
export const sanitizeText1 = (text: string): boolean => 
	/^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(text);
export const sanitizeText2 = (text: string): boolean => 
	/^[A-Za-z\s\d\W]+(?:\s[A-Za-z\s\d\W]+)*$/.test(text);

// NODEMAILER
export const emailAddress = process.env.EMAIL as string;
const emailPassword = process.env.EMAIL_PASS as string;

export const transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: emailAddress,
		pass: emailPassword,
	},
});