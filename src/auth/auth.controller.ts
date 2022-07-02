import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginApi, RefreshTokensApi } from './auth.swagger';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthResponse } from './entities/auth-token.response';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @LoginApi()
  async login(@Req() request): Promise<AuthResponse> {
    return {
      accessToken: await this.authService.generateAccessTokenForUser(
        request.user,
      ),
      refreshToken: await this.authService.generateRefreshTokenForUser(
        request.user,
      ),
    };
  }

  @Post('/refresh-tokens')
  @RefreshTokensApi()
  async refreshTokens(
    @Body() { refreshToken }: RefreshTokenDto,
  ): Promise<AuthResponse> {
    return {
      accessToken: await this.authService.generateAccessTokenFromRefreshToken(
        refreshToken,
      ),
      refreshToken,
    };
  }
}
