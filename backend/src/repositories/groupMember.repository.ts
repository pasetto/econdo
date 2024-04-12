import { prisma } from '../database/prisma-client';
import { GroupMember, GroupMemberCreate, GroupMemberRepository } from '../interfaces/groupMember.interface';

class GroupMemberRepositoryPrisma implements GroupMemberRepository {
// async findAll(): Promise<GroupMember[]> {
//     const result = await prisma.groupMember.findMany();
//     return result;
// }

async findById(id: string): Promise<GroupMember[] | null> {
    const result = await prisma.groupMember.findMany({
        where: {
            groupId: id,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                },
            },
        },

    });
    return result || null;
}

async findByUserId(id: string): Promise<GroupMember[] | null> {
    const result = await prisma.groupMember.findMany({
        where: {
            userId: id,
        }
    });
    return result || null;
}

async create({groupId, userId}): Promise<GroupMember> {
    const result = await prisma.groupMember.create({
        data: {
            groupId,
            userId,
            friendId: userId,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                },
            },
        },
    });
    return result;
}
  
async update(id: string, data: GroupMemberCreate): Promise<GroupMember> {
    const result = await prisma.groupMember.update({
        where: {
            id,
        },
        data: {
            friendId: data.friendId,
            userId: data.userId,
            groupId: data.groupId,
        },
    });
    return result;
}  
  async delete(id: string): Promise<boolean> {
    const result = await prisma.groupMember.delete({
      where: {
        id,
      },
    });
    return !!result;
  }

  async isUserInGroup(userId: string, groupId: string): Promise<boolean> {
    const result = await prisma.groupMember.findFirst({
      where: {
        groupId,
        userId,
      }
    });
    console.log(result);
    return !!result;
  }

  async exclude(user, keys) {
    return Object.fromEntries(
      Object.entries(user).filter(([key]) => !keys.includes(key))
    );
  }
}

export { GroupMemberRepositoryPrisma };
