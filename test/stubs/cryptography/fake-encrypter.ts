import { EncryptPayload } from '@/domain/forum/application/gateways/cryptography/encrypter-payload';

export class FakeEncrypter implements EncryptPayload {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload);
  }
}
