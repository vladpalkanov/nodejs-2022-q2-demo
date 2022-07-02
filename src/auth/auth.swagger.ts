import { applyDecorators } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { CredentialsDto } from './dto/credentials.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AuthResponse } from './entities/auth-token.response';

export function LoginApi() {
  return applyDecorators(
    ApiTags('Auth'),
    ApiOperation({
      summary: 'Login',
      description:
        'Logins a user and returns a JWT-tokens (access and refresh)',
    }),
    ApiBody({ type: CredentialsDto }),
    ApiOkResponse({ description: 'Successful login', type: AuthResponse }),
    ApiForbiddenResponse({ description: 'Incorrect login or password' }),
  );
}

export function RefreshTokensApi() {
  return applyDecorators(
    ApiTags('Auth'),
    ApiOperation({
      summary: 'Refresh tokens',
      description: 'Refresh access token with refresh token',
    }),
    ApiBody({ type: RefreshTokenDto }),
    ApiOkResponse({
      description: 'Tokens refreshed sucessfully',
      type: AuthResponse,
    }),
    ApiUnprocessableEntityResponse({
      description: 'token expired of malformed',
    }),
  );
}
