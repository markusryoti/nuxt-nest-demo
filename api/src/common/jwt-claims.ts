import { ApiProperty } from '@nestjs/swagger';

export class JwtClaims {
  @ApiProperty({
    example: 1,
    description: 'Access token subject',
  })
  sub: string;

  @ApiProperty({
    example: 'john',
  })
  email: string;

  @ApiProperty({
    example: 1630456800,
    description: 'Access token issued at',
  })
  iat: number;

  @ApiProperty({
    example: 1630456800,
    description: 'Access token expiration',
  })
  exp: number;
}
