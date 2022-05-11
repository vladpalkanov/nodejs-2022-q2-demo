import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from './types/user.entity';

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
}
