import { FastifyReply, FastifyRequest } from 'fastify';
import jsonwebtoken from 'jsonwebtoken';
import { ErrorHandler } from './../handlers/errorHandler';

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
  const token = req.headers.authorization;
  if (!token) {
    return reply.status(401).send({ message: 'Token not found' });
  }


  const user = await jsonwebtoken.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET || "secret", (err, decoded) => { if (err) throw new ErrorHandler('Invalid token', 400); return decoded; });
  req.user = user;
  
}