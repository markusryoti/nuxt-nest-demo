import { Module } from '@nestjs/common';
import { DrizzleService } from './db/drizzle-service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  exports: [DrizzleService],
  providers: [DrizzleService],
})
export class InfrastructureModule {}
