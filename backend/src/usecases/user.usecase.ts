import { User, UserCreate, UserRepository } from '../interfaces/user.interface';
import { UserRepositoryPrisma } from '../repositories/user.repository';

export class UserUseCase {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepositoryPrisma();
  }

  async create({ name, email, password, phone }: UserCreate): Promise<User> {
    const verifyIfUserExists = await this.userRepository.findByEmail(email);
    if (verifyIfUserExists) {
      throw new Error('User already exists');
    }
    const result = await this.userRepository.create({ email, name, password, phone });

    return result;
  }

  async findAll(): Promise<User[]> {
    const result = await this.userRepository.findAll();
    return result;
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.userRepository.findById(id);
    return result;
  }

  async update(id: string, { name, email, phone, password }: UserCreate): Promise<User> {
    const result = await this.userRepository.update(id, { name, email, password, phone });
    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    return result;
  }

}
