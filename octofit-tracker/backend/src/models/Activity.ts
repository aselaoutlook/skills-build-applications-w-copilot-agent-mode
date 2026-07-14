import mongoose, { Schema, Document } from 'mongoose';

export interface IActivity extends Document {
  name: string;
  type: string;
  duration: number;
  calories: number;
}

const activitySchema = new Schema<IActivity>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number, required: true }
}, {
  timestamps: true
});

export default mongoose.model<IActivity>('Activity', activitySchema);
