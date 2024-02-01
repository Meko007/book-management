import mongoose, { Document, Schema } from 'mongoose';

export interface IBlacklist extends Document {
    token: string;
    expiredAt: Date;
}

const blacklistSchema = new Schema(
	{
		token: {
			type: String,
			required: true,
			unique: true,
		},
		expiredAt: {
			type: Date,
			required: true,
		},
	},
	{ timestamps: true }
);

const BlacklistModel = mongoose.model<IBlacklist>('Blacklist', blacklistSchema);

export default BlacklistModel;