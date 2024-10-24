import express from 'express';
import { auth } from '../middleware/auth';
import { addProduct } from '../controllers/productController';

const router = express.Router();

router.post('/', auth, addProduct);

export default router;