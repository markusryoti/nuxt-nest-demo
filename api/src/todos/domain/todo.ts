import { ApiProperty } from '@nestjs/swagger';

export class Todo {
  @ApiProperty({ example: 'some-uuid-here' })
  id: string;

  @ApiProperty({ example: 'some-title-here' })
  title: string;

  @ApiProperty({ example: 'some-description-here' })
  description: string;

  @ApiProperty()
  completed: boolean;

  @ApiProperty({ example: 'some-user-id-here' })
  userId: string;
}
