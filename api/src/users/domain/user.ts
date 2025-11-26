import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: String, description: 'User ID' })
  id: string;

  @ApiProperty({ type: String, description: 'User email' })
  email: string;
}
