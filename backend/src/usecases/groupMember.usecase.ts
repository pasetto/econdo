import { ErrorHandler } from '../handlers/errorHandler';
import { GroupMember, GroupMemberCreate, GroupMemberRepository } from '../interfaces/groupMember.interface';
import { UserRepository } from '../interfaces/user.interface';
import { GroupMemberRepositoryPrisma } from '../repositories/groupMember.repository';
import { UserRepositoryPrisma } from '../repositories/user.repository';

export class GroupMemberUseCase {
  private groupMemberRepository: GroupMemberRepository;
  private userRepository: UserRepository;
  constructor() {
    this.groupMemberRepository = new GroupMemberRepositoryPrisma();
    this.userRepository = new UserRepositoryPrisma();
  }
  
  async create({  groupId, name, email, phone }: GroupMemberCreate): Promise<GroupMember> {
    if (!groupId) {
      throw new ErrorHandler("O GroupId é obrigatório", 400);
    }
    // Verificar se o usuário já existe
    let user = await this.userRepository.findByEmail(email);
    
    // Se o usuário não existir, criar um novo
    if (!user) {
      user = await this.userRepository.create({ name, email, password: "", phone });
    }
    
    // Verificar se o usuário já está no grupo
    const isUserInGroup = await this.groupMemberRepository.isUserInGroup(user.id, groupId);
    if (isUserInGroup) {
      throw new ErrorHandler("Usuário já está no grupo", 400);
    }
    const result = await this.groupMemberRepository.create({  groupId, userId: user.id});
    return result;
  }

  async findById(id: string): Promise<GroupMember | null> {
    const result = await this.groupMemberRepository.findById(id);
    return result;
  }

  async findByUserId(id: string): Promise<GroupMember | null> {
    const result = await this.groupMemberRepository.findByUserId(id);
    return result;
  }
  
  async update(id: string, {  groupId, userId, friendId }: GroupMemberCreate): Promise<GroupMember> {
    const result = await this.groupMemberRepository.update(id, {  groupId, userId, friendId });
    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.groupMemberRepository.delete(id);
    return result;
  }

}
