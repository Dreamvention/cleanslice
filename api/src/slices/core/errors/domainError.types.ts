export interface IErrorData {
  code: string;
  type: ErrorTypes;
  message: string;
  error: string;
}

export enum ErrorTypes {
  Domain = 'domain',
  Network = 'network',
  Request = 'request',
  Server = 'server',
  Unauthorized = 'unauthorized',
  NotFound = 'notFound',
  Unknown = 'unknown',
}

export const ErrorCodes = {
  UNEXPECTED_ERROR: 'UNEXPECTED_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  BAD_REQUEST: 'BAD_REQUEST',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  // Add more codes as needed
};
