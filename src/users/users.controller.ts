import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as crypto from 'crypto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('users')
export class UsersController {
  private users = new Map<User['id'], User>();

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
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
    return Array.from(this.users.values());
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

    this.users.set(user.id, user);
  }

  @Put()
  @ApiTags('Users')
  @ApiOperation({
    summary: "Update a user's password",
    description: "Updates a user's password by ID",
  })
  @ApiBody({ type: UpdatePasswordDto })
  @ApiNoContentResponse({ description: 'The user has been updated' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  updatePassword(@Body() updatePasswordDto: UpdatePasswordDto): void {
    const user = this.users.get(updatePasswordDto.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new BadRequestException('Old password is not correct');
    }

    user.password = updatePasswordDto.password;

    this.users.set(user.id, user);
  }
}
