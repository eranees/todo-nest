import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  HttpException,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AbstractApiResponse } from 'src/utils/general-response';
import { QueryFailedError } from 'typeorm';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Signup' })
  @ApiBody({ type: CreateUserDto })
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup<T>(
    @Body() CreateUserDto: CreateUserDto,
  ): Promise<AbstractApiResponse<T>> {
    try {
      const response: AbstractApiResponse<T> =
        await this.authService.signup(CreateUserDto);
      return response;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new HttpException(
          {
            error: 'INTERNAL_SERVER_ERROR',
            message: 'Query failed',
            status: 500,
            data: null,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @ApiOperation({ summary: 'Signin' })
  @ApiBody({ type: CreateUserDto })
  @Post('signin')
  signin(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.signin('email', 'password');
  }

  @ApiOperation({ summary: 'Forgot Password' })
  @ApiBody({ type: CreateUserDto })
  @Post('forgot-password')
  forgotPassword(@Body() forgotPasswordDto: { email: string }) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @ApiOperation({ summary: 'Reset Password' })
  @ApiParam({ name: 'token', type: 'string' })
  @ApiBody({ type: UpdateAuthDto })
  @Patch('reset-password/:token')
  resetPassword(
    @Param('token') token: string,
    @Body() resetPasswordDto: UpdateAuthDto,
  ) {
    return this.authService.resetPassword(token, resetPasswordDto);
  }

  @ApiOperation({ summary: 'Get my account details' })
  @ApiParam({ name: 'id', type: 'string' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.authService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update Profile' })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBody({ type: UpdateAuthDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @ApiOperation({ summary: 'Delete account' })
  @ApiParam({ name: 'id', type: 'string' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
