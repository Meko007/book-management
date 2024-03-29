import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { isEmail, capitalizeName } from '../utils/util';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
	role: 'admin' | 'user';
    authentication: {
        password: string;
        jwtToken: string;
    };
	favourites: string[];
	suspended: boolean;
	resetToken: string;
}

const userSchema = new Schema(
	{
		firstName: {
			type: String, 
			required: true,
		},
		lastName: {
			type: String, 
			required: true,
		},
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
			lowercase: true,
			validate: [isEmail, 'Please enter a valid email address'],
		},
		role: {
			type: String,
			enum: ['admin', 'user'],
			default: 'user',
			required: true,
		},
		authentication: {
			password: {
				type: String,
				required: true,
				select: false,
			},
			jwtToken: {
				type: String, 
				select: false
			},
		},
		favourites: {
			type: [String],
			default: [],
		},
		suspended: {
			type:  Boolean,
			default: false,
		},
		resetToken: {
			type: String,
			default: null,
		}
	},
	{ timestamps: true }
);

userSchema.pre<IUser>('save', async function(next) {
	this.firstName = capitalizeName(this.firstName);
	this.lastName = capitalizeName(this.lastName);

	if (!this.isModified('authentication.password')) {
		return next();
	}
	try {
		const hashedPassword = await bcrypt.hash(this.authentication.password, 10);
		this.authentication.password = hashedPassword;
		next();
	} catch (error) {
		console.error(error);
	}
});


const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;