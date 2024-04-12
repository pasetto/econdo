import { prisma } from '../database/prisma-client';
import { User, UserCreate, UserRepository } from '../interfaces/user.interface';

class UserRepositoryPrisma implements UserRepository {
  async findAll(): Promise<User[]> {
    const result = await prisma.user.findMany();
    return result;
  }
  async findById(id: string): Promise<User | null> {
    const result = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    return result || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    
    return result || null;
  }
  async create(data: UserCreate): Promise<User> {
    const result = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
        avatar: '', 
        accessToken: '', 
        refreshToken: '', 
      },
    });

    return result;
  }
  update(id: string, data: UserCreate): Promise<User> {
    const result = prisma.user.update({
      where: {
        id,
      },
      data: {
        ...data

      },
    });
    return result;
  }  
  async delete(id: string): Promise<boolean> {
    const result = await prisma.user.delete({
      where: {
        id,
      },
    });
    return !!result;
  }
}

export { UserRepositoryPrisma };
