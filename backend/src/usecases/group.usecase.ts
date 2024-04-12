import { ErrorHandler } from '../handlers/errorHandler';
import { Group, GroupCreate, GroupRepository } from '../interfaces/group.interface';
import { GroupMemberRepository } from '../interfaces/groupMember.interface';
import { GroupRepositoryPrisma } from '../repositories/group.repository';
import { GroupMemberRepositoryPrisma } from '../repositories/groupMember.repository';
import UserNotificationService from '../services/userNotification.service';
import { AuthUseCase } from './auth.usecase';

export class GroupUseCase {
	private groupRepository: GroupRepository;
	private groupMemberRepository: GroupMemberRepository;
	private userNotificationService = new UserNotificationService();
	private authUseCase: AuthUseCase;
	constructor() {
		this.groupRepository = new GroupRepositoryPrisma();
		this.groupMemberRepository = new GroupMemberRepositoryPrisma();
		this.authUseCase = new AuthUseCase();
	}
	
	async create({ name, drawnDate, deliveryDate, deliveryPlace, authorId }: GroupCreate): Promise<Group> {
		const result = await this.groupRepository.create({ name, drawnDate, deliveryDate, deliveryPlace, authorId });
		return result;
	}
	
	async findAll(req): Promise<Group[]> {
		const user = req.user;
		const result = await this.groupRepository.findAll(user.id);
		for(const group of result) {
			const members = await this.groupMemberRepository.findById(group.id);
			if(members)
			group.users = members;
		}
		return result;
	}

	async findMeAll(req): Promise<Group[]> {
		const user = req.user;
		const member = await this.groupMemberRepository.findByUserId(user.id);
		if(!member)
			throw new ErrorHandler("Você não está participando de nenhum grupo", 400);

		const result = [];
		for(const group of member) {
			const groupData = await this.groupRepository.findById(group.groupId);
			if(groupData) {
				const members = await this.groupMemberRepository.findById(group.groupId);
				if(members)
					groupData.users = members;
				result.push(groupData);
			}
		}
		return result;
	}
	
	async findById(id: string): Promise<Group | null> {
		const result = await this.groupRepository.findById(id);
		const members = await this.groupMemberRepository.findById(id);
		if(result && members)
		result.users = members;
		return result ;
	}
	
	async update(id: string, { name, drawnDate, deliveryDate, deliveryPlace, authorId }: GroupCreate): Promise<Group> {
		const result = await this.groupRepository.update(id, { name, drawnDate, deliveryDate, deliveryPlace, authorId });
		return result;
	}
	
	async delete(id: string): Promise<boolean> {
		const result = await this.groupRepository.delete(id);
		return result;
	}
	
	async draw(id: string): Promise<boolean> {
		const group = await this.groupRepository.findById(id);
		if(!group)
		throw new ErrorHandler("Grupo não encontrado", 404);
		// get all members
		const members = await this.groupMemberRepository.findById(id);
		if(!members)
		throw new ErrorHandler("Grupo sem membros", 400);
		// Misturar os membros fazendo o ultimo tirar o primeiro
		const shuffled = members.sort(() => Math.random() - 0.5);
		
		// Atualizar os membros
		for(let i = 0; i < shuffled.length; i++) {
			const member = shuffled[i];
			const nextMember = shuffled[(i + 1) % shuffled.length];
			await this.groupMemberRepository.update(member.id, { groupId: id, userId: member.userId, friendId: nextMember.userId });
			this.userNotificationService.sendNotification(member.user, `Sorteio realizado - ${group.name}`, `Parabéns ${member.user.name}, você pegou... <br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>⬇️<br>Você tirou ${nextMember.user.name}<br>⬆️<br>⬆️<br>⬆️<br>⬆️<br>⬆️<br>⬆️<br>⬆️<br>⬆️<br>⬆️<br>⬆️<br>⬆️<br>⬆️<br>⬆️<br>⬆️<br>⬆️<br>Obrigado por usar Amigo Secreto - Econdo`);
		}
		
		group.status = 'FINISHED';
		group.drawnDate = new Date();
		// Atualizar o status do grupo
		await this.groupRepository.update(id, group);
		
		return true;
	}
}