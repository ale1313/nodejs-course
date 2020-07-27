import { Document, model, Schema } from 'mongoose';

export interface User extends Document {
  username: string;
  password: string;
  email: string;
  data: { age: number; gender: string };
  role: 'admin' | 'seller';
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  data: {
    age: Number,
    gender: String,
  },
  role: { type: String, enum: ['admin', 'seller'], default: 'seller' },
});

export default model<User>('User', userSchema);
