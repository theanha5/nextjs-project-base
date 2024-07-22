import { ConstructorOf } from '@/types';

export class BaseError<TName extends string, TData = undefined> extends Error {
  name: TName;

  cause?: any;

  extraData?: TData;

  constructor({
    cause,
    extraData,
    message,
    name,
  }: {
    name: TName;
    message: string;
    cause?: any;
    extraData?: TData;
  }) {
    super();
    this.name = name;
    this.message = message;
    this.cause = cause;
    this.extraData = extraData;
  }
}

export function errorHasName<
  TName extends string,
  TClass extends BaseError<TName, any> = BaseError<TName, any>,
>(
  error: unknown,
  {
    errorClass,
    name,
  }: {
    errorClass: ConstructorOf<TClass>;
    name: TName;
  }
): error is TClass {
  return error instanceof errorClass && error.name === name;
}

// type ErrorName = 'TEST_ERROR' | 'TEST_ERROR_CLASS';

// class ApiError extends BaseError<ErrorName, { test: string }> {}

// try {
//   throw new ApiError({
//     name: 'TEST_ERROR',
//     message: 'test',
//   });
// } catch (error) {
// if (error instanceof ApiError && error.name === 'TEST_ERROR') {
//   const tError = error as ApiError;
// }

//   if (errorHasName<ErrorName>(error, { errorClass: ApiError, name: 'TEST_ERROR' })) {
//   }
// }
