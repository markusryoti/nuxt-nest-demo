import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  // let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '900s' },
        }),
      ],
      providers: [AuthService, UsersService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    // userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a valid JWT token', async () => {
    const tokenResponse = await service.signIn('john', 'changeme');
    expect(tokenResponse).toBeDefined();
    expect(tokenResponse.access_token).toMatch(
      /^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/,
    );
  });
});
