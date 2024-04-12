import { prisma } from '../database/prisma-client';
import { Group, GroupCreate, GroupRepository } from '../interfaces/group.interface';

class GroupRepositoryPrisma implements GroupRepository {
async findAll(authorId?): Promise<Group[]> {
    const result = await prisma.group.findMany({
        where: {
            authorId,
        },
    });
    return result.map(item => ({
        ...item,
        drawnDate: item.drawDate,
        authorId: item.authorId,
    }));
}

async findById(id: string): Promise<Group | null> {
    const result = await prisma.group.findFirst({
        where: {
            id,
        },
    });
    return result ? { ...result, drawnDate: result.drawDate } : null;
}

async create(data: GroupCreate): Promise<Group> {
    const result = await prisma.group.create({
        data: {
            name: data.name,
            drawDate: new Date(data.drawnDate),
            deliveryDate: new Date(data.deliveryDate),
            deliveryPlace: data.deliveryPlace,
            authorId: data.authorId || '1',
            status: 'PENDING',
        },
    });
    return { ...result, drawnDate: result.drawDate };
}
  
async update(id: string, data: GroupCreate): Promise<Group> {
    const result = await prisma.group.update({
        where: {
            id,
        },
        data: {
            name: data.name,
            drawDate: new Date(data.drawnDate),
            deliveryDate: new Date(data.deliveryDate),
            deliveryPlace: data.deliveryPlace,
            status: data.status || 'PENDING',
        },
    });
    return { ...result, drawnDate: result.drawDate };
}  
  async delete(id: string): Promise<boolean> {
    const result = await prisma.group.delete({
      where: {
        id,
      },
    });
    return !!result;
  }

  
}

export { GroupRepositoryPrisma };
