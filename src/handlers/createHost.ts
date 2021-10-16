import { APIGatewayProxyResult } from 'aws-lambda';
import validator from '@middy/validator';
import createError from 'http-errors';
import { v4 as uuid } from 'uuid';

import commonMiddleware from 'src/lib/commonMiddleware';
import { createHostSchema } from 'src/lib/schemas/createHostSchema';
import { MiddyRequest } from 'src/types/middy';
import { dynamodb, TableName } from 'src/lib/dbClient';

export async function createHost(
  event: MiddyRequest
): Promise<APIGatewayProxyResult> {
  const newHost = {
    id: uuid(),
    ...event.body
  };
  try {
    const params = {
      TableName,
      Item: newHost
    };
    await dynamodb.put(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify({ host: newHost })
    };
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
}

export const handler = commonMiddleware(createHost).use(
  validator({
    inputSchema: createHostSchema,
    ajvOptions: {
      useDefaults: true,
      strict: false
    }
  })
);
