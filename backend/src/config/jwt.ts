import jwt from 'jsonwebtoken';

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};
export const verifyToken = (token: string): { userId: string } => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
  } catch (error) {
    throw new Error('Invalid token');
  }
};
