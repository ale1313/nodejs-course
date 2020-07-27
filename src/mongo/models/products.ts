// MODULES
import { Document, model, Schema } from 'mongoose';

// TYPES
import { User } from './users';

interface Product extends Document {
  name: string;
  description: string;
  price: number;
  images: string[];
  user: User | string;
}

const productSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [{ type: String, required: true }], default: [] },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

export default model<Product>('Product', productSchema);
