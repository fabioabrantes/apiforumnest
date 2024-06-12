import { Module } from '@nestjs/common';
import { EnvModule } from '../env/env.module';
import { RedisService } from './cache/redis/redis.service';
import { ICacheRepository } from './cache/i-cache-repository';
import { RedisCacheRepository } from './cache/redis/redis-cache-repository';

@Module({
  imports: [EnvModule],
  providers: [
    RedisService,
    {
      provide: ICacheRepository,
      useClass: RedisCacheRepository,
    },
  ],
  exports: [ICacheRepository],
})
export class CacheModule {}