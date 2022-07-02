import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RefreshToken } from './entities/refresh-token.entity';

@Injectable()
export class RefreshTokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly jwtService: JwtService,
  ) {}

  async saveForUser(user: User, expiresIn: number): Promise<void> {
    const token = RefreshToken.fromObject({
      userId: user.id,
      expires: calculateExpirationDateFromTtl(expiresIn),
    });

    await this.refreshTokenRepository.save(token);
  }

  findByUserId(userId: string): Promise<RefreshToken> {
    return this.refreshTokenRepository.findOneBy({ userId });
  }
}

function calculateExpirationDateFromTtl(ttl: number): Date {
  const expires = new Date();

  expires.setTime(expires.getTime() + ttl);

  return expires;
}
