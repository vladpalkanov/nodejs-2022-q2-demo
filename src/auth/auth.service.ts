import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenConfig } from 'src/config/config.types';
import { isPasswordsEqual } from 'src/helpers/is-passwords-equal';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './auth.types';
import { RefreshTokenService } from './refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  private readonly accessTokenConfig =
    this.configService.get<JwtTokenConfig>('jwt.accessToken');
  private readonly refreshTokenConfig =
    this.configService.get<JwtTokenConfig>('jwt.refreshToken');

  async validateCredentials(login: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByLogin(login);

    if (user && isPasswordsEqual(password, user.password)) {
      return user;
    }

    return null;
  }

  async generateAccessTokenFromRefreshToken(
    refreshToken: string,
  ): Promise<string> {
    const tokenPayload = await this.decodeRefreshToken(refreshToken);
    const token = await this.refreshTokenService.findByUserId(
      tokenPayload.userId,
    );

    if (!token) {
      throw new UnprocessableEntityException('token expired of malformed');
    }

    const user = await this.usersService.findOneById(token.userId);

    if (!user) {
      throw new UnprocessableEntityException('token expired of malformed');
    }

    return this.generateAccessTokenForUser(user);
  }

  private async decodeRefreshToken(token: string): Promise<JwtPayload> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.refreshTokenConfig.secret,
      });
    } catch (err) {
      throw new UnprocessableEntityException('token expired of malformed');
    }
  }

  generateAccessTokenForUser(user: User): Promise<string> {
    return this.jwtService.signAsync(
      { userId: user.id, login: user.login },
      this.accessTokenConfig,
    );
  }

  async generateRefreshTokenForUser(user: User): Promise<string> {
    const token = this.jwtService.signAsync(
      { userId: user.id, login: user.login },
      this.refreshTokenConfig,
    );

    await this.refreshTokenService.saveForUser(
      user,
      this.refreshTokenConfig.expiresIn,
    );

    return token;
  }
}
