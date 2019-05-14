import { IoAdapter } from '@nestjs/websockets';
import redisIoAdapter from 'socket.io-redis';

const redisAdapter = redisIoAdapter({ host: '112.74.61.35', port: 6379 });

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    server.adapter(redisAdapter);
    return server;
  }
}