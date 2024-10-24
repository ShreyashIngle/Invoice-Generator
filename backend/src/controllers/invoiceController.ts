
// import { Request, Response } from 'express';
// import Invoice from '../models/Invoice';
// import Product from '../models/Product';
// import { generatePDF } from '../services/pdfService';

// interface CustomRequest extends Request {
//   userId?: string;
// }

// export const createInvoice = async (req: CustomRequest, res: Response): Promise<void> => {
//   try {
//     const { products } = req.body;

//     // Log the incoming request body
//     console.log("Request Body:", req.body);

//     // Validate that products are provided
//     if (!products || products.length === 0) {
//       res.status(400).json({ message: 'Products are required' });
//       return;
//     }

//     // Validate and save products
//     const savedProducts = await Promise.all(products.map(async (product: any) => {
//       if (!product.name || product.quantity <= 0 || product.rate <= 0) {
//         throw new Error('Invalid product data');
//       }

//       const total = product.quantity * product.rate;
//       const gst = total * 0.18; // Assuming GST is 18%
      
//       const newProduct = new Product({
//         name: product.name,
//         quantity: product.quantity,
//         rate: product.rate,
//         total,
//         gst
//       });

//       await newProduct.save();

//       return {
//         productId: newProduct._id,
//         quantity: product.quantity,
//         rate: product.rate,
//         total,
//         gst
//       };
//     }));

//     // Log saved products
//     console.log("Saved Products:", savedProducts);

//     // Calculate total amount
//     const totalAmount = savedProducts.reduce((sum: number, product: any) => sum + product.total + product.gst, 0);

//     // Create invoice
//     const invoice = new Invoice({
//       user: req.userId,
//       products: savedProducts,
//       totalAmount,
//       date: req.body.date || new Date() // Use provided date or current date
//     });

//     await invoice.save();

//     // Generate PDF
//     let pdf;
//     try {
//       pdf = await generatePDF(invoice, savedProducts);
//     } catch (pdfError) {
//       console.error('Error generating PDF:', pdfError);
//       res.status(500).json({ message: 'Error generating PDF' });
//       return; // Stop further execution
//     }

//     res.contentType('application/pdf');
//     res.send(pdf);
//   } catch (error) {
//     console.error('Error creating invoice:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };



// controllers/invoiceController.ts
import { Request, Response } from 'express';
import Invoice from '../models/Invoice';
import Product from '../models/Product';
import { generatePDF } from '../services/pdfService';

interface CustomRequest extends Request {
  userId?: string;
}

export const createInvoice = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const { products } = req.body;

    if (!products || products.length === 0) {
      res.status(400).json({ message: 'Products are required' });
      return;
    }

    // Create and save products first
    const savedProducts = await Promise.all(products.map(async (productData: any) => {
      const product = new Product({
        name: productData.name,
        quantity: productData.quantity,
        rate: productData.rate,
        total: productData.quantity * productData.rate,
        gst: (productData.quantity * productData.rate) * 0.18
      });
      await product.save();
      
      return {
        productId: product._id,
        quantity: productData.quantity,
        rate: productData.rate,
        total: product.total,
        gst: product.gst
      };
    }));

    // Calculate total amount including GST
    const totalAmount = savedProducts.reduce((sum, product) => 
      sum + product.total + product.gst, 0
    );

    // Create and save invoice
    const invoice = new Invoice({
      user: req.userId,
      products: savedProducts,
      totalAmount,
      date: new Date()
    });

    await invoice.save();

    // Generate PDF with the populated invoice
    const pdf = await generatePDF(invoice);

    res.contentType('application/pdf');
    res.send(pdf);
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ message: 'Server error' });
  }
};