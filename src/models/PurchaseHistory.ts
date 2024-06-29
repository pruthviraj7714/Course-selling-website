import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IPurchaseHistory extends Document {
    user : mongoose.Schema.Types.ObjectId,
    course : mongoose.Schema.Types.ObjectId,
    courseName : string,
    purchaseDate : Date,
    price : Number,
    transactionId : string,
    status: 'completed' | 'pending' | 'failed'
}

const PurchaseHistorySchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  courseName : {
    type : String,
    required: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'failed'],
    default: 'completed',
  },
}, { timestamps: true });

const PurchaseHistory: Model<IPurchaseHistory> = mongoose.models.PurchaseHistory || mongoose.model<IPurchaseHistory>('PurchaseHistory', PurchaseHistorySchema);

export default PurchaseHistory;
