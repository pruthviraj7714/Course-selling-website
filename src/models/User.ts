import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  bio?: string;
  gender : 'male' | 'female';
  profileAvatar: string;
  role: 'student' | 'admin';
  wishlist?: mongoose.Schema.Types.ObjectId;
  learningPoints: number;
  purchasedCourses: mongoose.Schema.Types.ObjectId[];
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  gender : {
    type : String,
    enum : ["male", "female"]
  },
  profileAvatar: {
    type: String,
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student',
  },
  wishlist: {
    type: Schema.Types.ObjectId,
    ref: 'Wishlist',
  },
  learningPoints: {
    type: Number,
    default: 0,
  },
  purchasedCourses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
  }],
}, { timestamps: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
