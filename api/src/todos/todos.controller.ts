import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import type { AuthenticatedRequest } from 'src/common/types';
import { Protected } from '../auth/auth.guard';
import { TodoDto } from './dto/todo.dto';
import { TodosService } from './todos.service';
import { Todo } from './domain/todo';
import { UpdateTodoDto } from './dto/update-todo';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Protected()
  @Get()
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [Todo],
  })
  async index(@Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;

    const todos = await this.todosService.getTodos(userId);

    return todos;
  }

  @Protected()
  @Post()
  @ApiResponse({
    status: 201,
    description: 'The created record',
    type: Todo,
  })
  async create(@Body() todoReq: TodoDto, @Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    const { title, description, completed } = todoReq;
    const newTodo = await this.todosService.createTodo(
      title,
      description,
      completed,
      userId,
    );

    return newTodo;
  }

  @Protected()
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() todoReq: UpdateTodoDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user.sub;
    const { title, description, completed } = todoReq;
    const updatedTodo = await this.todosService.updateTodo(
      id,
      userId,
      title,
      description,
      completed,
    );

    return updatedTodo;
  }

  @Protected()
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    const userId = req.user.sub;
    await this.todosService.deleteTodo(id, userId);
  }
}
