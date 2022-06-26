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
  UseGuards,
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
  FindOneUserByIdApi,
  UpdatePasswordApi,
} from './users.swagger';
import { isPasswordsEqual } from 'src/helpers/is-passwords-equal';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @FindAllUsersApi()
  async findAll(): Promise<Array<User>> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @FindOneUserByIdApi()
  async findOneById(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findOneById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Post()
  // @UseGuards(JwtAuthGuard)
  @CreateUserApi()
  async create(@Body() createUserDto: CreateUserDto): Promise<void> {
    const user = User.fromObject(createUserDto);

    this.usersService.create(user);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @UpdatePasswordApi()
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    const user = await this.usersService.findOneById(updatePasswordDto.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const arePasswordsEqual = isPasswordsEqual(
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
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @DeleteUserApi()
  async deleteUser(@Param('id') id: string): Promise<void> {
    const wasUserDeleted = await this.usersService.delete(id);

    if (!wasUserDeleted) {
      throw new NotFoundException('User not found');
    }
  }
}
