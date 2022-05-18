import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
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
    ApiOkResponse({
      description: 'Successful operation',
      type: User,
      isArray: true,
    }),
  );
}

export function CreateUserApi() {
  return applyDecorators(
    ApiTags('Users'),
    ApiOperation({
      summary: 'Create user',
      description: 'Create a new user',
    }),
    ApiBody({ type: CreateUserDto }),
    ApiCreatedResponse({ description: 'The user has been created' }),
    ApiBadRequestResponse({ description: 'Bad request' }),
  );
}

export function UpdatePasswordApi() {
  return applyDecorators(
    ApiTags('Users'),
    ApiOperation({
      summary: "Update a user's password",
      description: "Updates a user's password by ID",
    }),
    ApiBody({ type: UpdatePasswordDto }),
    ApiOkResponse({ description: 'The user has been updated' }),
    ApiBadRequestResponse({ description: 'Bad request' }),
  );
}

export function DeleteUserApi() {
  return applyDecorators(
    ApiTags('Users'),
    ApiOperation({
      summary: 'Delete user',
      description: 'Deletes user by ID',
    }),
    ApiNoContentResponse({ description: 'The user has been deleted' }),
    ApiNotFoundResponse({ description: 'User not found' }),
  );
}
