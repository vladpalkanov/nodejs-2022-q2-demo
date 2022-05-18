import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users = new Map<string, User>();

  async findAll(): Promise<Array<User>> {
    return Array.from(this.users.values());
  }

  async findOne(id: string): Promise<User> {
    return this.users.get(id);
  }

  async create(user: User): Promise<void> {
    this.users.set(user.id, user);
  }

  async delete(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  async update(user: User): Promise<void> {
    this.users.set(user.id, user);
  }
}
