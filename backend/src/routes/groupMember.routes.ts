import { FastifyInstance } from 'fastify';
import { GroupMemberCreate } from '../interfaces/groupMember.interface';
import { GroupMemberUseCase } from '../usecases/groupMember.usecase';
import { authMiddleware } from '../middlewares/auth.middleware';

export async function groupMemberRoutes(fastify: FastifyInstance) {
  const userUseCase = new GroupMemberUseCase();
  fastify.addHook('preHandler', authMiddleware);
 
  // GET /groupMember - List all groupMember
  // fastify.get('/', async (req, reply) => {
  //   const data = await userUseCase.findAll();
  //   return reply.send(data);
  // });

  // GET /group-member/:id - Get user by id
  fastify.get<{ Params: { id: string } }>('/:id', {
    schema: {
      tags: ['Group Members'],
      summary: 'Busca associações de membros por id do grupo',
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Id da associação do membro no grupo'
          },
        }
      },
      // body: {
      //   type: 'object',
      //   properties: {
      //     hello: { type: 'string' },
      //     obj: {
      //       type: 'object',
      //       properties: {
      //         some: { type: 'string' }
      //       }
      //     }
      //   }
      // },
      // response: {
      //   201: {
      //     description: 'Successful response',
      //     type: 'object',
      //     properties: {
      //       hello: { type: 'string' }
      //     }
      //   },
      //   default: {
      //     description: 'Default response',
      //     type: 'object',
      //     properties: {
      //       foo: { type: 'string' }
      //     }
      //   }
      // },
      // security: [
      //   {
      //     "apiKey": []
      //   }
      // ]
    }
  }, async (req, reply) => {
    const { id } = req.params;
    const data = await userUseCase.findById(id);
    return reply.send(data);
  });

   
  // POST /group-member - Create a new user
  fastify.post<{ Body: GroupMemberCreate }>('/', {
    schema: {
      tags: ['Group Members'],
      summary: 'Insere um novo membro no grupo',
      params: {
        type: 'object',
        properties: {
          // groupId: {
          //   type: 'string',
          //   description: 'Id do grupo'
          // },
          // userId: {
          //   type: 'string',
          //   description: 'Id do usuário'
          // },
        }
      },
      // body: {
      //   type: 'object',
      //   properties: {
      //     hello: { type: 'string' },
      //     obj: {
      //       type: 'object',
      //       properties: {
      //         some: { type: 'string' }
      //       }
      //     }
      //   }
      // },
      // response: {
      //   201: {
      //     description: 'Successful response',
      //     type: 'object',
      //     properties: {
      //       hello: { type: 'string' }
      //     }
      //   },
      //   default: {
      //     description: 'Default response',
      //     type: 'object',
      //     properties: {
      //       foo: { type: 'string' }
      //     }
      //   }
      // },
      // security: [
      //   {
      //     "apiKey": []
      //   }
      // ]
    }
  }, async (req, reply) => {
    const {  groupId, name, email, phone } = req.body;
    try {
      const data = await userUseCase.create({ groupId, name, email, phone });
      return reply.send(data);
    } catch (error) {
      reply.send(error);
    }
  });

  // PUT /group-member/:id - Update user by id
  // fastify.put<{ Params: { id: string }, Body: GroupMemberCreate }>('/:id',  {
  //   schema: {

  //     tags: ['Users'],
  //     summary: 'Modifica ',
  //     params: {
  //       type: 'object',
  //       properties: {
  //         name: {
  //           type: 'string',
  //           description: 'Nome do grupo'
  //         },
  //         drawnDate: {
  //           type: 'string',
  //           description: 'Data do sorteio'
  //         },
  //         deliveryDate: {
  //           type: 'string',
  //           description: 'Data da entrega'
  //         },
  //         deliveryPlace: {
  //           type: 'string',
  //           description: 'Local da entrega'
  //         },
  //       }
  //     },
  //     // body: {
  //     //   type: 'object',
  //     //   properties: {
  //     //     hello: { type: 'string' },
  //     //     obj: {
  //     //       type: 'object',
  //     //       properties: {
  //     //         some: { type: 'string' }
  //     //       }
  //     //     }
  //     //   }
  //     // },
  //     // response: {
  //     //   201: {
  //     //     description: 'Successful response',
  //     //     type: 'object',
  //     //     properties: {
  //     //       hello: { type: 'string' }
  //     //     }
  //     //   },
  //     //   default: {
  //     //     description: 'Default response',
  //     //     type: 'object',
  //     //     properties: {
  //     //       foo: { type: 'string' }
  //     //     }
  //     //   }
  //     // },
  //     // security: [
  //     //   {
  //     //     "apiKey": []
  //     //   }
  //     // ]
  //   }
  // }, async (req, reply) => {
  //   const { id } = req.params;
  //   const { groupId, userId, friendId } = req.body;
  //   const data = await userUseCase.update(id, { groupId, userId, friendId });
  //   return reply.send(data);
  // });

  // DELETE /group-member/:id - Delete user by id
  fastify.delete<{ Params: { id: string } }>('/:id',  {
    schema: {
      tags: ['Group Members'],
      summary: 'Deleta um membro do grupo por id',
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'Id da associação do membro no grupo'
          },
        }
      },
      // body: {
      //   type: 'object',
      //   properties: {
      //     hello: { type: 'string' },
      //     obj: {
      //       type: 'object',
      //       properties: {
      //         some: { type: 'string' }
      //       }
      //     }
      //   }
      // },
      // response: {
      //   201: {
      //     description: 'Successful response',
      //     type: 'object',
      //     properties: {
      //       hello: { type: 'string' }
      //     }
      //   },
      //   default: {
      //     description: 'Default response',
      //     type: 'object',
      //     properties: {
      //       foo: { type: 'string' }
      //     }
      //   }
      // },
      // security: [
      //   {
      //     "apiKey": []
      //   }
      // ]
    }
  }, async (req, reply) => {
    const { id } = req.params;
    const data = await userUseCase.delete(id);
    return reply.send(data);
  });

}
