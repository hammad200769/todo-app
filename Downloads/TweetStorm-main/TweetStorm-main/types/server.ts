import { NextRequest } from 'next/server';

export type RequestMetaData = { params: Record<string, string> };

export type RouteInitiator = (
  request: NextRequest,
  requestMetadata: RequestMetaData
) => Promise<Response>;

export type RouteHandler = (
  request: NextRequest,
  next: (data: any) => Response,
  requestMetadata?: RequestMetaData
) => Promise<Response>;

export type Middleware = (
  request: NextRequest,
  requestMetadata: RequestMetaData
) => Promise<MiddlewareResponse>;

export type MiddlewareResponse = {
  pass: boolean;
  response?: Response;
  data?: any;
};

export type Session = {
  id: string;
  email: string;
};
