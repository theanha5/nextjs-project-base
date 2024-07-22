import { isEmpty, isNil } from 'lodash-es';
import queryString from 'query-string';
//
import { Maybe } from '@/types';

// return path format: /path....
export const standardizePath = (path: string) => {
  const stdPath = path.replace(/\/{2,}/gi, '/');
  return stdPath.startsWith('/') ? stdPath : `/${stdPath}`;
};

export const concatPath = (...paths: (string | undefined)[]) =>
  standardizePath(paths.filter(Boolean).join('/'));

// return url format: origin/path (not end with /)

export const standardizeURL = (url: string) => {
  if (!url) return '';

  const stdURL = new URL('', url);
  const paths = stdURL.pathname.split('/').filter((path) => !!path);

  if (paths.length === 0) return stdURL.origin;

  return `${stdURL.origin}/${paths.join('/')}`;
};

export const concatBaseURLAndPath = (baseURL: Maybe<string>, path: Maybe<string>) => {
  const stdPath = path ? standardizePath(path) : '';

  if (!baseURL) return stdPath;

  const stdBaseURL = standardizeURL(baseURL);
  if (!stdPath) return stdBaseURL;

  return `${stdBaseURL}${stdPath}`;
};

export const getUrlByFilter = (filters: any) => {
  if (isEmpty(filters)) return `${window.location.pathname}`;

  const query = queryString.stringify(filters, { skipEmptyString: true });

  return `${window.location.pathname}?${query}`;
};

export type TParamKey = string;
export type TParamValue = any;
export type TBaseParams = Record<TParamKey, TParamValue>;

export const makeNewSearchParam = (searchParams: URLSearchParams, param: TBaseParams) => {
  const qrStr = queryString.stringify({ [param.key]: param.value }, { arrayFormat: 'bracket' });
  const newSearchParams = new URLSearchParams(qrStr);

  /* eslint-disable no-restricted-syntax */
  for (const [key, value] of searchParams.entries()) {
    /* eslint-disable no-continue */
    if (key === param.key) continue;
    newSearchParams.append(key, value);
  }

  return newSearchParams;
};

export const withParam = <TInp, TOut = TInp>(inVal: TInp, outVal: TOut) =>
  isNil(inVal) ? undefined : outVal;
