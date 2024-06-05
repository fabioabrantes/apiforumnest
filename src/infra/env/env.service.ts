import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Env } from './env';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<Env, true>) {} // esse true é porque passar por uma validação

  get<T extends keyof Env>(key: T) {
    return this.configService.get<T>(key, { infer: true });
  }
}