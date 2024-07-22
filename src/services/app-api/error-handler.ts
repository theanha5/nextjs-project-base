import { isEmpty } from 'lodash-es';


import { BaseError } from '@/libs/error';
import { TErrorName, TServerError } from './types';

type TConstructorProps = TServerError & { name: TErrorName; status: number };

export class AppApiError extends BaseError<TErrorName, Record<string, any>> {
  constructor({ message, messages, error, code, name, trace, status }: TConstructorProps) {
    super({
      name,
      message: generateMessage({ status, message, messages }),
      cause: trace,
      extraData: {
        messages,
        code,
        message,
        error,
        status,
      },
    });
  }
}

export type TAppApiError = InstanceType<typeof AppApiError>;

export function getErrorMessage(error: any) {
  if (error instanceof AppApiError) return error.message;
  return String(error);
}

const generateMessage = ({
  status,
  message,
  messages,
}: Pick<TConstructorProps, 'status' | 'message' | 'messages'>) => {
  const serverErrorMsg = isEmpty(messages) ? message : Object.values(messages!)[0][0] ?? '';

  if (serverErrorMsg) return serverErrorMsg;

  switch (status) {
    case 400:
      return 'Không tìm thấy đối tượng này.';
    case 401:
      return 'errors.api.session_expired';
    case 500:
      return 'errors.api.server_error';
    default:
      return 'Có lỗi xảy ra. Vui lòng thử lại sau';
  }
};
