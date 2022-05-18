import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

export function FindAllUsersApi() {
  return applyDecorators(
    ApiTags('Users'),
    ApiOperation({
      summary: 'Get all users',
      description: 'Get all users',
    }),
    ApiBearerAuth(),
    ApiOkResponse({
      description: 'Successful operation',
      type: User,
      isArray: true,
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function CreateUserApi() {
  return applyDecorators(
    ApiTags('Users'),
    ApiOperation({
      summary: 'Create user',
      description: 'Create a new user',
    }),
    ApiBearerAuth(),
    ApiBody({ type: CreateUserDto }),
    ApiCreatedResponse({ description: 'The user has been created' }),
    ApiBadRequestResponse({ description: 'Bad request' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function UpdatePasswordApi() {
  return applyDecorators(
    ApiTags('Users'),
    ApiOperation({
      summary: "Update a user's password",
      description: "Updates a user's password by ID",
    }),
    ApiBearerAuth(),
    ApiBody({ type: UpdatePasswordDto }),
    ApiOkResponse({ description: 'The user has been updated' }),
    ApiBadRequestResponse({ description: 'Bad request' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function DeleteUserApi() {
  return applyDecorators(
    ApiTags('Users'),
    ApiOperation({
      summary: 'Delete user',
      description: 'Deletes user by ID',
    }),
    ApiBearerAuth(),
    ApiNoContentResponse({ description: 'The user has been deleted' }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
