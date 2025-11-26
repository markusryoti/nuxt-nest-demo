import { ApiProperty } from '@nestjs/swagger';

export class TodoDto {
  @ApiProperty({
    example: 'Todo 1',
    description: 'The name of the Todo',
  })
  title: string;

  @ApiProperty({
    example: 'Some todo',
    description: 'The description of the Todo',
  })
  description: string;

  @ApiProperty()
  completed: boolean;
}
