import { uuid, pgTable, varchar, boolean } from 'drizzle-orm/pg-core';

export const usersTable = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const todosTable = pgTable('todos', {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  userId: uuid()
    .notNull()
    .references(() => usersTable.id),
  completed: boolean().notNull().default(false),
});
