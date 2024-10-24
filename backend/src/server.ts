import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the cors package
import connectDB from './config/database';
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import invoiceRoutes from './routes/invoices';
import passwordRoutes from './routes/forgot';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    credentials: true // Allow credentials (if needed)
}));

app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/password', passwordRoutes);

app.get('/', (req, res) => {
    res.send('Invoice Generator API');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
