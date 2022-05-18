import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
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
import { User } from './entities/user.entity';
import * as crypto from 'crypto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
    return this.usersService.findAll();
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

    this.usersService.create(user);
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
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    const user = await this.usersService.findOne(updatePasswordDto.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new BadRequestException('Old password is not correct');
    }

    user.password = updatePasswordDto.password;

    this.usersService.update(user);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiTags('Users')
  @ApiOperation({
    summary: 'Delete user',
    description: 'Deletes user by ID',
  })
  @ApiNoContentResponse({ description: 'The user has been deleted' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async deleteUserById(@Param('id') id: string): Promise<void> {
    const wasUserDeleted = this.usersService.delete(id);

    if (!wasUserDeleted) {
      throw new NotFoundException('User not found');
    }
  }
}
