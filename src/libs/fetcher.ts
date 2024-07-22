import queryString from 'query-string';

type FetchOptions = {
  headers?: HeadersInit;
  credentials?: RequestCredentials;
  body?: BodyInit | Record<string | number, any>; // Allow object body
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  signal?: AbortSignal;
  queryParams?: Record<string, string>; // Query params object
};

// Define types for interceptors
type RequestInterceptor = (request: Request, options: FetchOptions) => Promise<Request>;

type ResponseInterceptor = (response: Response, options: FetchOptions) => Promise<Response>;

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const defaultOptions: FetchOptions = {
  headers: defaultHeaders,
};

let requestInterceptor: RequestInterceptor | null = null;
let responseInterceptor: ResponseInterceptor | null = null;

export const setRequestInterceptor = (interceptor: RequestInterceptor) => {
  requestInterceptor = interceptor;
};

export const setResponseInterceptor = (interceptor: ResponseInterceptor) => {
  responseInterceptor = interceptor;
};

const fetchWithInterceptors = async (url: string, options: FetchOptions = defaultOptions) => {
  // Handle query params
  if (options.queryParams) {
    url += queryString.stringify(options.queryParams);
  }

  let request;

  // Handle object body
  if (typeof options.body === 'object') {
    request = new Request(url, {
      ...options,
      body: JSON.stringify(options.body),
    });
    request.headers.set('Content-Type', 'application/json');
  }

  if (requestInterceptor) {
    request = new Request(url, { ...options, body: options.body as BodyInit });
    request = await requestInterceptor(request, options);

    if (!request) {
      return null;
    }
  }

  let response = await fetch(request!);

  if (responseInterceptor) {
    response = await responseInterceptor(response, options);

    if (!response) {
      return null;
    }
  }

  return response;
};

export const get = async (url: string, options: FetchOptions = defaultOptions) => {
  return fetchWithInterceptors(url, {
    ...options,
    method: 'GET',
  });
};

export const post = async (
  url: string,
  body: BodyInit | object, // Allow object body
  options: FetchOptions = defaultOptions
) => {
  return fetchWithInterceptors(url, {
    ...options,
    method: 'POST',
    body,
  });
};

export const put = async (
  url: string,
  body: BodyInit | object, // Allow object body
  options: FetchOptions = defaultOptions
) => {
  return fetchWithInterceptors(url, {
    ...options,
    method: 'PUT',
    body,
  });
};

export const patch = async (
  url: string,
  body: BodyInit | object, // Allow object body
  options: FetchOptions = defaultOptions
) => {
  return fetchWithInterceptors(url, {
    ...options,
    method: 'PATCH',
    body,
  });
};

export const fDelete = async (url: string, options: FetchOptions = defaultOptions) => {
  return fetchWithInterceptors(url, {
    ...options,
    method: 'DELETE',
  });
};

// Example usage:

// setRequestInterceptor((request, options) => {
//   // Add authorization header
//   const token = localStorage.getItem('token');
//   if (token) {
//     request.headers.set('Authorization', `Bearer ${token}`);
//   }
//   return request;
// });

// setResponseInterceptor(async (response) => {
//   // Check for errors and log them
//   if (!response.ok) {
//     const error = await response.json();
//     console.error('API error:', error);
//   }
//   return response;
// });

// export async function GET(
//   req: NextApiRequest,
//   res: NextFetchEvent,
// ) {
//   const data = await get('https://example.com/api/data');
//   res.status(200).json(data);
// }

// Example with query params and object body:
// const queryParams = { page: 1, limit: 10 };
// const body = { name: 'John Doe', age: 30 };
// const data = await post('https://example.com/api/users', body, { queryParams });
