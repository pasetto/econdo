import { FastifyInstance } from 'fastify';
import { AuthLogin, AuthCreate } from '../interfaces/auth.interface';
import { AuthUseCase } from '../usecases/auth.usecase';
import { verifyJWT } from '../middlewares/verifyJwt.middleware';

export async function authRoutes(fastify: FastifyInstance) {
  const authUseCase = new AuthUseCase();
  
  fastify.post('/login', async (req, reply) => {
    const { email, password } = req.body;
    const data = await authUseCase.login(email, password);
    return reply.send(data);
  });

  fastify.post('/register', async (req, reply) => {
      const { name, email, phone, password } = req.body;
      const data = await authUseCase.register({ name, email, phone, password });
      return reply.send(data);
  });

  // recover password
  fastify.post('/recover', async (req, reply) => {
    const data = await authUseCase.recover(req.body);
    return reply.send(data);
  });

  // fastify.post('/refresh', async (req, reply) => {
  //   const data = await authUseCase.refresh(req.body);
  //   return reply.send(data);
  // });

  // fastify.post('/logout', async (req, reply) => {
  //   const data = await authUseCase.logout(req.body);
  //   return reply.send(data);
  // });

  fastify.get('/me', { onRequest: verifyJWT }, async (req, reply) => {
    const data = await authUseCase.me(req.headers.authorization);
    return reply.send(data);
  });

}
