import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    authentication: {
        password: string;
        jwtToken: string;
    };
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
	},
	{ timestamps: true }
);

userSchema.pre<IUser>('save', async function(next) {
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