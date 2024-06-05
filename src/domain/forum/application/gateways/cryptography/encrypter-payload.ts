export abstract class EncryptPayload {
  abstract encrypt(payload: Record<string, unknown>): Promise<string>;
}