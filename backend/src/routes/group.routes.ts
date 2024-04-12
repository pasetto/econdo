import { FastifyInstance } from 'fastify';
import { GroupCreate } from '../interfaces/group.interface';
import { GroupUseCase } from '../usecases/group.usecase';
import { authMiddleware } from '../middlewares/auth.middleware';

export async function groupRoutes(fastify: FastifyInstance) {
  const groupUseCase = new GroupUseCase();
  fastify.addHook('preHandler', authMiddleware);
  // GET /group - List all group
  fastify.get('/', {
    schema: {
      description: 'post some data',
      tags: ['Groups'],
      summary: 'Busca todos os grupos cadastrados',
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'user id'
          }
        }
      },
    }
  }, async (req, reply) => {
    const data = await groupUseCase.findAll(req);
    return reply.send(data);
  });

  fastify.get('/member', {
    schema: {
      description: 'post some data',
      tags: ['Groups'],
      summary: 'Busca todos os grupos que o usuário está cadastrado',
      params: {
        type: 'object',
        properties: {
        }
      },
    }
  }, async (req, reply) => {
    const data = await groupUseCase.findMeAll(req);
    return reply.send(data);
  });

  // GET /group/:id - Get user by id
  fastify.get<{ Params: { id: string } }>('/:id', {
    schema: {
      description: 'post some data',
      tags: ['Groups'],
      summary: 'Busca um grupo cadastrado pelo id',
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'user id'
          }
        }
      },
    }
  }, async (req, reply) => {
    const { id } = req.params;
    const data = await groupUseCase.findById(id);
    return reply.send(data);
  });

   
  // POST /group - Create a new user
  fastify.post<{ Body: GroupCreate }>('/',{
    schema: {
      description: 'post some data',
      tags: ['Groups'],
      summary: 'Cria um novo grupo',
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
    const { name, drawnDate, deliveryDate, deliveryPlace, authorId } = req.body;
    try {
      const data = await groupUseCase.create({
        name,
        drawnDate,
        deliveryDate,
        deliveryPlace,
        authorId: authorId || req.user.id,
      });
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });

  // PUT /group/:id - Update user by id
  fastify.put<{ Params: { id: string }, Body: GroupCreate }>('/:id', {
    schema: {
      description: 'post some data',
      tags: ['Groups'],
      summary: 'Modifica um grupo por id',
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Id do grupo'
          },
        }
      },
    }
  }, async (req, reply) => {
    const { id } = req.params;
    const { name, drawnDate, deliveryDate, deliveryPlace, authorId } = req.body;
    const data = await groupUseCase.update(id, { name, drawnDate, deliveryDate, deliveryPlace, authorId });
    return reply.send(data);
  });

  // DELETE /group/:id - Delete user by id
  fastify.delete<{ Params: { id: string } }>('/:id', {
    schema: {
      description: 'post some data',
      tags: ['Groups'],
      summary: 'Deleta um grupo por id',
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Id do grupo'
          },
        }
      },
    }
  }, async (req, reply) => {
    const { id } = req.params;
    const data = await groupUseCase.delete(id);
    return reply.send(data);
  });


  // DELETE /group/:id - Delete user by id
  fastify.get<{ Params: { id: string } }>('/:id/draw', {
    schema: {
      description: 'post some data',
      tags: ['Groups'],
      summary: 'Executa o sorteio do grupo por id',
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Id do grupo'
          },
        }
      },
    }
  }, async (req, reply) => {
    const { id } = req.params;
    const data = await groupUseCase.draw(id);
    return reply.send(data);
  });

}
