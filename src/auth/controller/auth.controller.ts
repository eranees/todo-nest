import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Signup' })
  @ApiBody({ type: CreateAuthDto })
  @Post('signup')
  signup(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signup(createAuthDto);
  }

  @ApiOperation({ summary: 'Signin' })
  @ApiBody({ type: CreateAuthDto })
  @Post('signin')
  signin(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signin('email', 'password');
  }

  @ApiOperation({ summary: 'Forgot Password' })
  @ApiBody({ type: CreateAuthDto })
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
    return this.authService.findOne(+id);
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
