import { Uploader } from '@/domain/forum/application/gateways/storage/uploader';
import { Module } from '@nestjs/common';
import { TebiStorage } from './storage/tebi-storage';
import { EnvModule } from '../env/env.module';

@Module({
  imports: [EnvModule],
  providers: [
    {
      provide: Uploader,
      useClass: TebiStorage,
    },
  ],
  exports: [Uploader],
})
export class StorageModule {}