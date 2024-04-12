import { errorCodes } from 'fastify';
import { prisma } from '../database/prisma-client';
import { AuthRegister, AuthLogin, AuthMe, AuthToken, AuthRepository } from '../interfaces/auth.interface';
import { User } from '../interfaces/user.interface';

export class AuthRepositoryPrisma implements AuthRepository {

  async login(email: string): Promise<AuthMe>{
    const result = await prisma.user.findFirst({
      where: {
        email
      },
    });
    
    if (!result) {
      throw new Error('User not found');
    }
    return result;
  }

  async register(data: AuthRegister): Promise<User> {
    const result = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        avatar: '',
        accessToken: '',
        refreshToken: '',
      },
    });
    return result;
  }

  async validateToken(accessToken: AuthToken): Promise<boolean> {
    return true;
  }

  async refreshToken(refreshToken: AuthToken): Promise<string> {
    return 'newToken';
  }

  async logout(accessToken: AuthToken): Promise<boolean> {
    return true;
  }

  async me(email: string): Promise<AuthMe> {
    const result = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!result) {
      const err = new Error();
      err.name = 'UserNotFoundError';
      err.message = 'User not found';
      throw err;
    }
    return result;
  }
  
//   async findAll(): Promise<User[]> {
//     const result = await prisma.user.findMany();
//     return result;
//   }
//   async findById(id: string): Promise<User | null> {
//     const result = await prisma.user.findFirst({
//       where: {
//         id,
//       },
//     });
//     return result || null;
//   }
//   async findByEmail(email: string): Promise<User | null> {
//     const result = await prisma.user.findFirst({
//       where: {
//         email,
//       },
//     });

//     return result || null;
//   }
//   async create(data: UserCreate): Promise<User> {
//     const result = await prisma.user.create({
//       data: {
//         name: data.name,
//         email: data.email,
//         password: data.password,
//         phone: data.phone,
//       },
//     });
//     return result;
//   }
//   update(id: string, data: UserCreate): Promise<User> {
//     const result = prisma.user.update({
//       where: {
//         id,
//       },
//       data: {
//         name: data.name,
//         email: data.email,

//       },
//     });
//     return result;
//   }  
//   async delete(id: string): Promise<boolean> {
//     const result = await prisma.user.delete({
//       where: {
//         id,
//       },
//     });
//     return !!result;
//   }
}

