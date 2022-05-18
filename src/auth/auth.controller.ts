import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginApi } from './auth.swagger';
import { AuthTokenResponse } from './entities/auth-token.response';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @LoginApi()
  async login(@Req() request): Promise<AuthTokenResponse> {
    return {
      token: this.authService.makeAuthTokenForUser(request.user),
    };
  }
}
