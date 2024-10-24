import express from 'express';
import { auth } from '../middleware/auth';
import { createInvoice } from '../controllers/invoiceController';

const router = express.Router();

router.post('/', auth, createInvoice);

export default router;