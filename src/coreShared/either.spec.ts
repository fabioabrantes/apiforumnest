import { Either, error, success } from '@/coreShared/either';

function doSomeThing(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return success(10);
  } else {
    return error('error');
  }
}

test('success result', () => {
  const result = doSomeThing(true);

  expect(result.isSuccess()).toBe(true);
  expect(result.isError()).toBe(false);
})

test('error result', () => {
  const result = doSomeThing(false);

  expect(result.isError()).toBe(true);
  expect(result.isSuccess()).toBe(false);
})