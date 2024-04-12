import { FastifyInstance } from 'fastify';
import { UserCreate } from '../interfaces/user.interface';
import { UserUseCase } from '../usecases/user.usecase';
import { authMiddleware } from '../middlewares/auth.middleware';

export async function userRoutes(fastify: FastifyInstance) {
  const userUseCase = new UserUseCase();
  fastify.addHook('preHandler', authMiddleware);
 
  // GET /users - List all users
  fastify.get('/', {
    schema: {
      description: 'post some data',
      tags: ['Users'],
      summary: 'Admim busca todos os usuários cadastrados',
      params: {
        type: 'object',
        properties: {
        }
    }
  }
  }, async (req, reply) => {

    const data = await userUseCase.findAll();
    return reply.send(data);
  });

  // GET /users/:id - Get user by id
  fastify.get<{ Params: { id: string } }>('/:id', {
    schema: {
      description: 'post some data',
      tags: ['Users'],
      summary: 'Admim busca usuários por id',
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'id do usuário'
          },
        }
      },
    }
  }, async (req, reply) => {
    const { id } = req.params;
    const data = await userUseCase.findById(id);
    return reply.send(data);
  });

   
  // POST /users - Create a new user
  fastify.post<{ Body: UserCreate }>('/',  {
    schema: {
      description: 'post some data',
      tags: ['Users'],
      summary: 'Admim registra usuários',
      params: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Nome do grupo'
          },
          drawnDate: {
            type: 'string',
            description: 'Data do sorteio'
          },
          deliveryDate: {
            type: 'string',
            description: 'Data da entrega'
          },
          deliveryPlace: {
            type: 'string',
            description: 'Local da entrega'
          },
        }
      },
    }
  }, async (req, reply) => {
    const { name, email, password, phone } = req.body;
    try {
      const data = await userUseCase.create({
        name,
        email,
        password,
        phone,
      });
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });

  // PUT /users/:id - Update user by id
  fastify.put<{ Params: { id: string }, Body: UserCreate }>('/:id',  {
    schema: {
      description: 'post some data',
      tags: ['Users'],
      summary: 'Admim edita usuários',
      params: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Nome do usuário'
          },
          email: {
            type: 'string',
            description: 'Email do usuário'
          },
          password: {
            type: 'string',
            description: 'Senha do usuário'
          },
          phone: {
            type: 'string',
            description: 'Telefone do usuário'
          },
          isAdmin: {
            type: 'boolean',
            description: 'Se o usuário é admin'
          },
        }
      },
    }
  }, async (req, reply) => {
    const { id } = req.params;
    const { name, email, password, phone } = req.body;
    const data = await userUseCase.update(id, { name, email, password, phone });
    return reply.send(data);
  });

  // DELETE /users/:id - Delete user by id
  fastify.delete<{ Params: { id: string } }>('/:id',  {
    schema: {
      description: 'post some data',
      tags: ['Users'],
      summary: 'Admim deleta usuários',
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Id do usuário'
          }
        }
      },
    }
  }, async (req, reply) => {
    const { id } = req.params;
    const data = await userUseCase.delete(id);
    return reply.send(data);
  });

}
