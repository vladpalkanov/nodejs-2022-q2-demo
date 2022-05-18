import { applyDecorators } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { CredentialsDto } from './dto/credentials.dto';
import { AuthTokenResponse } from './entities/auth-token.response';

export function LoginApi() {
  return applyDecorators(
    ApiTags('Login'),
    ApiOperation({
      summary: 'Login',
      description: 'Logins a user and returns a JWT-token',
    }),
    ApiBody({ type: CredentialsDto }),
    ApiOkResponse({ description: 'Successful login', type: AuthTokenResponse }),
    ApiForbiddenResponse({ description: 'Incorrect login or password' }),
  );
}
