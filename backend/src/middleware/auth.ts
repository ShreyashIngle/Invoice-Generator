import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/jwt';

interface AuthRequest extends Request {
  userId?: string;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });
    return;
  }

  try {
    const decoded = verifyToken(token);
    req.userId = decoded.userId; // Attach the userId to the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
