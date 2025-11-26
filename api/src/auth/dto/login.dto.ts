import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'mikki@hiiri.com',
    description: 'The username of the user',
  })
  email: string;

  @ApiProperty({
    example: 'password',
  })
  password: string;
}
