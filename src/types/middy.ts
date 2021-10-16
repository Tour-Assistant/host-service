import { HostedBy } from './host';

export interface MiddyRequest {
  body?: Partial<HostedBy>;
  pathParameters?: {
    id: string;
  };
}
