import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'login' });
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateCredentials(username, password);

    if (!user) {
      throw new ForbiddenException();
    }

    return user;
  }
}
