import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IWishlist extends Document {
  user: mongoose.Schema.Types.ObjectId;
  courses: mongoose.Schema.Types.ObjectId[];
}

const WishlistSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course',
  }],
}, { timestamps: true });

const Wishlist: Model<IWishlist> = mongoose.models.Wishlist || mongoose.model<IWishlist>('Wishlist', WishlistSchema);

export default Wishlist;
