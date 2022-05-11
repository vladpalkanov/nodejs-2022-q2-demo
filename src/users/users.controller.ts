import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as crypto from 'crypto';

@Controller('users')
export class UsersController {
  private users: Array<User> = [];

  @Get()
  @ApiTags('Users')
  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all users',
  })
  @ApiOkResponse({
    description: 'Successful operation',
    type: User,
    isArray: true,
  })
  async findAll(): Promise<Array<User>> {
    return this.users;
  }

  @Post()
  @ApiTags('Users')
  @ApiOperation({
    summary: 'Create user',
    description: 'Create a new user',
  })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ description: 'The user has been created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    const user = new User();

    user.id = crypto.randomBytes(4).toString('hex');
    user.login = createUserDto.login;
    user.password = createUserDto.password;

    this.users.push(user);
  }
}
