import { Module } from '@nestjs/common';

import { EncryptPayload } from '@/domain/forum/application/gateways/cryptography/encrypter-payload';
import { HashComparer } from '@/domain/forum/application/gateways/cryptography/hash-comparer';
import { HashGenerator } from '@/domain/forum/application/gateways/cryptography/hash-generator';

import { JwtEncrypter } from './cryptography/jwt-encrypter';
import { BcryptHasher } from './cryptography/bcrypt-hasher';

@Module({
  providers: [
    { provide: EncryptPayload, useClass: JwtEncrypter },
    { provide: HashComparer, useClass: BcryptHasher },
    { provide: HashGenerator, useClass: BcryptHasher },
  ],
  exports: [EncryptPayload, HashComparer, HashGenerator],
})
export class CryptographyModule {}