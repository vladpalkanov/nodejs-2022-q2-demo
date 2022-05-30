import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<Array<User>> {
    return this.userRepository.find();
  }

  findOneById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  findOneByLogin(login: string): Promise<User> {
    return this.userRepository.findOneBy({ login });
  }

  async create(user: User): Promise<void> {
    await this.userRepository.save(user);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.userRepository.delete({ id });

    return result.affected > 0;
  }

  async patch(userId: string, user: Partial<User>): Promise<void> {
    await this.userRepository.update(userId, user);
  }
}
