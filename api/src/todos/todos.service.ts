import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DrizzleService } from 'src/infrastructure/db/drizzle-service';
import { todosTable } from 'src/infrastructure/db/schema';
import { eq } from 'drizzle-orm';

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

@Injectable()
export class TodosService {
  private readonly logger = new Logger(TodosService.name);

  constructor(private readonly drizzleService: DrizzleService) {}

  async getTodos(userId: string) {
    const todos = await this.drizzleService.db
      .select()
      .from(todosTable)
      .where(eq(todosTable.userId, userId));

    this.logger.log({ msg: 'found todos', numTodos: todos.length });

    return todos;
  }

  async createTodo(
    name: string,
    description: string,
    completed: boolean,
    userId: string,
  ) {
    const created = await this.drizzleService.db
      .insert(todosTable)
      .values({ title: name, description, completed, userId })
      .returning({
        id: todosTable.id,
        title: todosTable.title,
        description: todosTable.description,
        completed: todosTable.completed,
        userId: todosTable.userId,
      });

    this.logger.log({ msg: 'created todo', todo: created });

    return created[0] as Todo;
  }

  async updateTodo(
    id: string,
    userId: string,
    title?: string,
    description?: string,
    completed?: boolean,
  ) {
    const updated = await this.drizzleService.db.transaction(async (tx) => {
      const res = await tx
        .select()
        .from(todosTable)
        .where(eq(todosTable.id, id))
        .limit(1);

      const current = res[0];
      if (!current) {
        throw new NotFoundException(`Todo with id ${id} not found`);
      }

      if (current.userId !== userId) {
        throw new UnauthorizedException(
          `User ${userId} is not authorized to update todo ${id}`,
        );
      }

      const updateRes = await tx
        .update(todosTable)
        .set({
          title: title ?? current.title,
          description: description ?? current.description,
          completed: completed ?? current.completed,
        })
        .where(eq(todosTable.id, id))
        .returning({
          id: todosTable.id,
          title: todosTable.title,
          description: todosTable.description,
          completed: todosTable.completed,
          userId: todosTable.userId,
        });

      return updateRes[0] as Todo;
    });

    this.logger.log({ msg: 'updated todo', todo: updated });

    return updated;
  }

  async deleteTodo(id: string, userId: string) {
    await this.drizzleService.db.transaction(async (tx) => {
      const todo = await tx
        .select()
        .from(todosTable)
        .where(eq(todosTable.id, id))
        .limit(1);

      const current = todo[0];
      if (!current) {
        throw new NotFoundException(`Todo with id ${id} not found`);
      }

      if (current.userId !== userId) {
        throw new UnauthorizedException(
          `User ${userId} is not authorized to delete todo ${id}`,
        );
      }

      await tx.delete(todosTable).where(eq(todosTable.id, id));
    });
  }
}
