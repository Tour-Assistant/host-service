import { EVENT_STATUS, Tour } from './host';

export interface MiddyRequest {
  body?: Partial<Tour>;
  queryStringParameters?: {
    eventStatus: EVENT_STATUS;
  };
  pathParameters?: {
    id: string;
  };
}
