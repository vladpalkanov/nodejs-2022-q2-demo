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
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersService } from './users.service';
import {
  CreateUserApi,
  DeleteUserApi,
  FindAllUsersApi,
  UpdatePasswordApi,
} from './users.swagger';
import { comparePasswords } from 'src/helpers/compare-passwords';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @FindAllUsersApi()
  async findAll(): Promise<Array<User>> {
    return this.usersService.findAll();
  }

  @Post()
  @CreateUserApi()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    const user = User.fromObject(createUserDto);

    this.usersService.create(user);
  }

  @Put()
  @UpdatePasswordApi()
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    const user = await this.usersService.findOne(updatePasswordDto.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const arePasswordsEqual = comparePasswords(
      updatePasswordDto.oldPassword,
      user.password,
    );

    if (!arePasswordsEqual) {
      throw new BadRequestException('Old password is not correct');
    }

    this.usersService.patch(
      updatePasswordDto.id,
      User.fromObject({ password: updatePasswordDto.password }),
    );
  }

  @Delete(':id')
  @HttpCode(204)
  @DeleteUserApi()
  async deleteUser(@Param('id') id: string): Promise<void> {
    const wasUserDeleted = await this.usersService.delete(id);

    if (!wasUserDeleted) {
      throw new NotFoundException('User not found');
    }
  }
}
