import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, Protected } from './auth.guard';
import { type AuthenticatedRequest } from 'src/common/types';
import { LoginDto } from './dto/login.dto';
import { ApiResponse } from '@nestjs/swagger';
import { TokenResponse } from './dto/token-response.dto';
import { JwtClaims } from 'src/common/jwt-claims';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Token response',
    type: TokenResponse,
  })
  async signIn(@Body() signInDto: LoginDto) {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Protected()
  @Get('profile')
  @ApiResponse({
    status: 200,
    description: 'User profile',
    type: JwtClaims,
  })
  getProfile(@Req() req: AuthenticatedRequest) {
    return req.user;
  }
}
