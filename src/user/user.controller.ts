import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { UserResponseInterface } from 'src/user/types/userResponse.interface';
import { LoginUserDto } from 'src/user/dto/login.dto';
import { User } from 'src/user/decorators/user.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { UpdateUserDto } from 'src/user/dto/updateUser.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseSwagger } from 'src/user/types/userResponseSwagger';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User register',
    type: UserResponseSwagger,
  })
  @ApiResponse({ status: 423, description: 'Email or username are taken' })
  @UsePipes(new ValidationPipe())
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('login')
  @ApiBody({ type: LoginUserDto })
  @ApiResponse({
    status: 201,
    description: 'User login',
    type: UserResponseSwagger,
  })
  @ApiResponse({
    status: 422,
    description: 'Credentials are not valid',
  })
  @UsePipes(new ValidationPipe())
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get()
  @ApiResponse({
    status: 201,
    description: 'Get user',
    type: UserResponseSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Not authorized',
  })
  @UseGuards(AuthGuard)
  async currentUser(@User('id') id: number): Promise<UserResponseInterface> {
    const user = await this.userService.findById(id);
    return this.userService.buildUserResponse(user);
  }

  @Put()
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Update user',
    type: UserResponseSwagger,
  })
  @ApiResponse({
    status: 401,
    description: 'Not authorized',
  })
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User('id') currentUserId: number,
    @Body('user') updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(
      currentUserId,
      updateUserDto,
    );
    return this.userService.buildUserResponse(user);
  }
}
