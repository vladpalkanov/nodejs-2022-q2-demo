import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isPasswordsEqual } from 'src/helpers/is-passwords-equal';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateCredentials(login: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByLogin(login);
    if (user && isPasswordsEqual(password, user.password)) {
      return user;
    }

    return null;
  }

  makeAuthTokenForUser(user: User): string {
    return this.jwtService.sign({ userId: user.id, login: user.login });
  }
}
