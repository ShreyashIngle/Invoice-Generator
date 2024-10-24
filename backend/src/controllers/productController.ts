import { Request, Response } from 'express';
import Product from '../models/Product';

export const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, quantity, rate } = req.body;

    // Validate required fields
    if (!name || !quantity || !rate) {
      res.status(400).json({ message: 'Name, quantity, and rate are required.' });
      return;
    }

    // Ensure quantity and rate are numbers
    const quantityNum = Number(quantity);
    const rateNum = Number(rate);

    if (isNaN(quantityNum) || isNaN(rateNum)) {
      res.status(400).json({ message: 'Quantity and rate must be valid numbers.' });
      return;
    }

    const total = quantityNum * rateNum;
    const gst = total * 0.18;

    const product = new Product({ name, quantity: quantityNum, rate: rateNum, total, gst });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error adding product:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Server error' });
    }
  }
};