import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/infrastructure/db/drizzle-service';
import { hashPassword } from 'src/common/password';
import { usersTable } from 'src/infrastructure/db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(private readonly drizzle: DrizzleService) {}

  async findOne(email: string) {
    const user = await this.drizzle.db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    return user[0];
  }

  async findUsers() {
    return this.drizzle.db.select().from(usersTable);
  }

  async createUser(email: string, password: string) {
    const hashedPassword = await hashPassword(password);

    return this.drizzle.db
      .insert(usersTable)
      .values({ email, password: hashedPassword })
      .returning({ id: usersTable.id, email: usersTable.email });
  }
}
