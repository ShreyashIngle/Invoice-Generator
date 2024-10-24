// import mongoose, { Document, Schema } from 'mongoose';
// import { IProduct } from './Product';

// export interface IInvoice extends Document {
//   user: mongoose.Types.ObjectId;
//   products: IProduct[];
//   date: Date;
//   totalAmount: number;
// }

// const invoiceSchema = new Schema<IInvoice>({
//   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
//   date: { type: Date, default: Date.now },
//   totalAmount: { type: Number, required: true }
// });

// export default mongoose.model<IInvoice>('Invoice', invoiceSchema);


import mongoose, { Document, Schema } from 'mongoose';
import { IPopulatedProduct } from './Product'; 
export interface IUser {
  name: string;
  email: string;
}
// Define the IProduct interface
interface IProduct {
  productId: mongoose.Types.ObjectId; // Reference to Product model
  quantity: number; // Quantity of the product
  rate: number; // Rate of the product
  total: number; // Total amount for this product (quantity * rate)
  gst: number; // GST amount for this product
}

// Define the IInvoice interface extending Document
export interface IInvoice extends Document {
  user: IUser; // Add user details
  products: IPopulatedProduct[];
  date: Date; // Date of invoice creation
  totalAmount: number; // Total amount of the invoice including GST
}

// Define Product Schema
const ProductSchema: Schema = new Schema({
  productId: { type: mongoose.Types.ObjectId, ref: 'Product', required: true }, // Reference to Product
  quantity: { type: Number, required: true }, // Product quantity
  rate: { type: Number, required: true }, // Product rate
  total: { type: Number, required: true }, // Total amount for the product
  gst: { type: Number, required: true } // GST for the product
});

// Define Invoice Schema
const InvoiceSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [ProductSchema], // Change this line
  date: { type: Date, required: true, default: Date.now }, // Default date is now
  totalAmount: { type: Number, required: true } // Total invoice amount
});

// Export the Invoice model
export default mongoose.model<IInvoice>('Invoice', InvoiceSchema);