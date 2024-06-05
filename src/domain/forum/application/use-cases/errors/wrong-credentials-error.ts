import { UseCaseError } from '@/coreShared/errors/i-errors';

export class WrongCredentialsError extends Error implements UseCaseError {
  constructor() {
    super(`Credentials are not valid.`)
  }
}