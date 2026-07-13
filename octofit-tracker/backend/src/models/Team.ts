import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  sport: string;
  members: string[];
  city: string;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  sport: { type: String, required: true },
  members: [{ type: String, required: true }],
  city: { type: String, required: true }
}, {
  timestamps: true
});

export default mongoose.model<ITeam>('Team', teamSchema);
