import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisRepository implements OnModuleInit {
  client: RedisClientType;

  async onModuleInit() {
    if (!process.env.REDIS_URL) throw new Error('Redis Error: Please set the REDIS_URL');

    this.client = createClient({
      url: process.env.REDIS_URL,
    });

    this.client.on('error', (err) => console.error('Redis Client Error', err));

    (async () => {
      await this.client.connect();
    })();
  }
}
