
import puppeteer from 'puppeteer';
import { IInvoice } from '../models/Invoice';
import path from 'path';
import fs from 'fs';

const logopdf = fs.readFileSync(path.resolve(__dirname, '../services/logopdf.png')).toString('base64');

export const generatePDF = async (invoice: IInvoice): Promise<Buffer> => {
  // Populate user reference first
  const populatedInvoice = await invoice.populate<{ user: { name: string; email: string } }>('user');
  
  // Now populate the products
  await populatedInvoice.populate('products.productId');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const productRows = populatedInvoice.products.map((product) => `
    <tr style="border-bottom: 1px solid #f0f0f0;">
      <td style="padding: 12px 16px; color: #4A5568; font-size: 14px;">${product.productId.name}</td>
      <td style="padding: 12px 16px; color: #4A5568; font-size: 14px; text-align: center;">${product.quantity}</td>
      <td style="padding: 12px 16px; color: #4A5568; font-size: 14px; text-align: center;">${product.rate}</td>
      <td style="padding: 12px 16px; color: #4A5568; font-size: 14px; text-align: right;">USD ${product.total}</td>
    </tr>
  `).join('');

  const totalCharges = populatedInvoice.products.reduce((sum, product) => sum + product.total, 0);
  const gst = populatedInvoice.products.reduce((sum, product) => sum + product.gst, 0);
  const totalAmount = totalCharges + gst;

  // HTML content for the PDF
  const content = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        * {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
      </style>
    </head>
    <body style="width: 210mm; min-height: 297mm; background-color: white; padding: 40px;">
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 1px solid #EAEAEA;">
        <div>
          <h1 style="font-size: 18px; font-weight: 600; color: #1A1A1A; margin-bottom: 4px;">INVOICE GENERATOR</h1>
          <p style="font-size: 12px; color: #666666;">Generated Invoice</p>
        </div>
        
          <div>
             <div style="width: 115px; height: 40px;">
    <img src="data:image/png;base64,${logopdf}" style="width: 100%; height: auto;" alt="Levitation Logo" />

  </div>
          </div>
        </div>
      </div>

      <!-- Customer Info Box -->
<div style="
    background: 
      radial-gradient(55.35% 63.52% at 53.55% 87.4%, #0A0A0A 0%, #1D1F3A 100%), /* Darkened radial gradient */
      radial-gradient(116.08% 116.08% at 50.43% 51.58%, #0C0C0C 0%, rgba(0, 0, 0, 0) 100%), /* Darkened second radial gradient */
      linear-gradient(0deg, #0B3A99, #0B3A99); /* Darkened linear gradient */
    border-radius: 12px; 
    padding: 24px; 
    color: white; 
    margin-bottom: 12px;
    position: relative; /* To allow for layering */
    z-index: 0; /* Ensure layering is handled */
    height: 135px; /* Set height */
">

        <div style="display: flex; justify-content: space-between;">
          <div>
            <p style="font-size: 20px; color: #CCF575; margin-bottom: 4px;">${populatedInvoice.user.name}</p>
            <p style="font-size: 16px; color: #FFFFFF;">${populatedInvoice.user.email}</p>
          </div>
          <div>
            <p style="font-size: 12px; color: #FFFFFF;">Date: ${populatedInvoice.date.toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <!-- Products Table -->
      <div style="margin-bottom: 32px;">
       <div style="background: linear-gradient(90deg, #303661 0%, #263406 100%); border-radius: 78px; padding: 12px 16px; display: flex; justify-content: space-between; margin-bottom: 8px;">
  <span style="color: white; font-size: 14px; flex: 2; text-align: left; padding-left: 0;">Product</span>
  <span style="color: white; font-size: 14px; flex: 1; text-align: left; margin-left: -10px;">Qty</span> <!-- Negative margin -->
  <span style="color: white; font-size: 14px; flex: 1; text-align: left; margin-left: -4px;">Rate</span> <!-- Negative margin -->
  <span style="color: white; font-size: 14px; flex: 1; text-align: right; margin-left: -2px;">Total Amount</span> <!-- Slightly shifted to the left -->
</div>

        <table style="width: 100%; border-collapse: collapse;">
          <tbody>
            ${productRows}
          </tbody>
        </table>
      </div>

      <!-- Total Calculation Box -->
      <div style="width: 300px; margin-left: auto; border: 1px solid #E5E7EB; border-radius: 8px; padding: 20px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="font-size: 12px; color: #666666;">Total Charges</span>
          <span style="font-size: 12px; color: #666666;">$${totalCharges.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
          <span style="font-size: 10px; color: #666666;">GST (18%)</span>
          <span style="font-size: 10px; color: #666666;">$${gst.toFixed(2)}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding-top: 8px; border-top: 1px solid #A2A2A2;">
          <span style="font-size: 16px; font-weight: 600; color: #1A1A1A;">Total Amount</span>
          <span style="font-size: 16px; font-weight: 600; color: #165FE3;">$${totalAmount.toFixed(2)}</span>
        </div>
        </div>
        <div>
              <p style="font-size: 10px; text-align: left; margin-top: 60px;color: #000000;">Date: ${populatedInvoice.date.toLocaleDateString()}</p>
          </div>


     
    </body>
    </html>
  `;

  await page.setContent(content);
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '0',
      right: '0',
      bottom: '0',
      left: '0'
    }
  });

  await browser.close();
  return pdf;
};




// working

// import puppeteer from 'puppeteer';
// import { IInvoice } from '../models/Invoice';
// import path from 'path';
// import fs from 'fs';

// const logopdf = fs.readFileSync(path.resolve(__dirname, '../services/logopdf.png')).toString('base64');

// export const generatePDF = async (invoice: IInvoice): Promise<Buffer> => {
//   // Populate user reference first
//   const populatedInvoice = await invoice.populate<{ user: { name: string; email: string } }>('user');
  
//   // Now populate the products
//   await populatedInvoice.populate('products.productId');

//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   const productRows = populatedInvoice.products.map((product) => `
//     <tr style="border-bottom: 1px solid #f0f0f0;">
//       <td style="padding: 12px 16px; color: #4A5568; font-size: 14px;">${product.productId.name}</td>
//       <td style="padding: 12px 16px; color: #4A5568; font-size: 14px; text-align: center;">${product.quantity}</td>
//       <td style="padding: 12px 16px; color: #4A5568; font-size: 14px; text-align: center;">${product.rate}</td>
//       <td style="padding: 12px 16px; color: #4A5568; font-size: 14px; text-align: right;">USD ${product.total}</td>
//     </tr>
//   `).join('');

//   const totalCharges = populatedInvoice.products.reduce((sum, product) => sum + product.total, 0);
//   const gst = populatedInvoice.products.reduce((sum, product) => sum + product.gst, 0);
//   const totalAmount = totalCharges + gst;

//   // HTML content for the PDF
//   const content = `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <style>
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
//         * {
//           font-family: 'Inter', sans-serif;
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }
//       </style>
//     </head>
//     <body style="width: 210mm; min-height: 297mm; background-color: white; padding: 40px;">
//       <!-- Header -->
//       <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 1px solid #EAEAEA;">
//         <div>
//           <h1 style="font-size: 18px; font-weight: 600; color: #1A1A1A; margin-bottom: 4px;">INVOICE GENERATOR</h1>
//           <p style="font-size: 12px; color: #666666;">Generated Invoice</p>
//         </div>
        
//           <div>
//              <div style="width: 115px; height: 40px;">
//     <img src="data:image/png;base64,${logopdf}" style="width: 100%; height: auto;" alt="Levitation Logo" />

//   </div>
//           </div>
//         </div>
//       </div>

//       <!-- Customer Info Box -->
// <div style="
//     background: 
//       radial-gradient(55.35% 63.52% at 53.55% 87.4%, #0A0A0A 0%, #1D1F3A 100%), /* Darkened radial gradient */
//       radial-gradient(116.08% 116.08% at 50.43% 51.58%, #0C0C0C 0%, rgba(0, 0, 0, 0) 100%), /* Darkened second radial gradient */
//       linear-gradient(0deg, #0B3A99, #0B3A99); /* Darkened linear gradient */
//     border-radius: 12px; 
//     padding: 24px; 
//     color: white; 
//     margin-bottom: 12px;
//     position: relative; /* To allow for layering */
//     z-index: 0; /* Ensure layering is handled */
//     height: 135px; /* Set height */
// ">

//         <div style="display: flex; justify-content: space-between;">
//           <div>
//             <p style="font-size: 20px; color: #CCF575; margin-bottom: 4px;">${populatedInvoice.user.name}</p>
//             <p style="font-size: 16px; color: #FFFFFF;">${populatedInvoice.user.email}</p>
//           </div>
//           <div>
//             <p style="font-size: 12px; color: #FFFFFF;">Date: ${populatedInvoice.date.toLocaleDateString()}</p>
//           </div>
//         </div>
//       </div>

//       <!-- Products Table -->
//       <div style="margin-bottom: 32px;">
//        <div style="background: linear-gradient(90deg, #303661 0%, #263406 100%); border-radius: 78px; padding: 12px 16px; display: flex; justify-content: space-between; margin-bottom: 8px;">
//   <span style="color: white; font-size: 14px; flex: 2; text-align: left; padding-left: 0;">Product</span>
//   <span style="color: white; font-size: 14px; flex: 1; text-align: left; margin-left: -10px;">Qty</span> <!-- Negative margin -->
//   <span style="color: white; font-size: 14px; flex: 1; text-align: left; margin-left: -4px;">Rate</span> <!-- Negative margin -->
//   <span style="color: white; font-size: 14px; flex: 1; text-align: right; margin-left: -2px;">Total Amount</span> <!-- Slightly shifted to the left -->
// </div>

//         <table style="width: 100%; border-collapse: collapse;">
//           <tbody>
//             ${productRows}
//           </tbody>
//         </table>
//       </div>

//       <!-- Total Calculation Box -->
//       <div style="width: 300px; margin-left: auto; border: 1px solid #E5E7EB; border-radius: 8px; padding: 20px;">
//         <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
//           <span style="font-size: 12px; color: #666666;">Total Charges</span>
//           <span style="font-size: 12px; color: #666666;">$${totalCharges.toFixed(2)}</span>
//         </div>
//         <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
//           <span style="font-size: 10px; color: #666666;">GST (18%)</span>
//           <span style="font-size: 10px; color: #666666;">$${gst.toFixed(2)}</span>
//         </div>
//         <div style="display: flex; justify-content: space-between; padding-top: 8px; border-top: 1px solid #A2A2A2;">
//           <span style="font-size: 16px; font-weight: 600; color: #1A1A1A;">Total Amount</span>
//           <span style="font-size: 16px; font-weight: 600; color: #165FE3;">$${totalAmount.toFixed(2)}</span>
//         </div>
//         </div>
//         <div>
//               <p style="font-size: 10px; text-align: left; margin-top: 60px;color: #000000;">Date: ${populatedInvoice.date.toLocaleDateString()}</p>
//           </div>


//       <!-- Footer Note -->
//       <div style="background: #272833; border-radius: 78px; padding: 16px; text-align: center; margin-top: 400px;">
//         <p style="color: white; font-size: 10px; line-height: 1.5;">
//           We are pleased to provide any further information you may require and look forward to assisting with your next order. Rest assured, it will receive our prompt and dedicated attention.
//         </p>
//       </div>
//     </body>
//     </html>
//   `;

//   await page.setContent(content);
//   const pdf = await page.pdf({
//     format: 'A4',
//     printBackground: true,
//     margin: {
//       top: '0',
//       right: '0',
//       bottom: '0',
//       left: '0'
//     }
//   });

//   await browser.close();
//   return pdf;
// };

