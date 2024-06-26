import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  price: number;
  duration: string;
  instructor: string;
  category?: string;
  studentsEnrolledCount: number;
  thumbnail?: string;
  rating?: number;
  wishlistedUsers: mongoose.Types.ObjectId[]; // Array of User IDs who have wishlisted the course
  purchasedUsers: mongoose.Types.ObjectId[]; // Array of User IDs who have purchased the course
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
  },
  instructor: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  studentsEnrolledCount: {
    type: Number,
    default: 0,
  },
  thumbnail: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  wishlistedUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'User', // Replace 'User' with your actual user model name if different
  }],
  purchasedUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'User', // Replace 'User' with your actual user model name if different
  }],
}, { timestamps: true });

const Course: Model<ICourse> = mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);

export default Course;
