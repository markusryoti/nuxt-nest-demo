import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

@Injectable()
export class DrizzleService {
  private _db: NodePgDatabase<Record<string, never>> & {
    $client: Pool;
  };

  constructor(private readonly configService: ConfigService) {
    const url: string | undefined = this.configService.get('DATABASE_URL');
    if (!url) {
      throw new Error('DATABASE_URL is not defined');
    }

    this._db = drizzle(url);
  }

  get db() {
    return this._db;
  }
}
