export type TServerError = {
  message?: string;
  messages?: Record<string, Array<string>>;
  error: string;
  code: 0;
  trace: string;
};

export type TErrorName = 'COMMON_ERROR';
