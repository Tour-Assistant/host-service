import { APIGatewayProxyResult } from 'aws-lambda';
import validator from '@middy/validator';
import createError from 'http-errors';

import commonMiddleware from 'src/lib/commonMiddleware';
import { createHostSchema } from 'src/lib/schemas/createHostSchema';
import { MiddyRequest } from 'src/types/middy';
import { dynamodb, TableName } from 'src/lib/dbClient';

export async function updateHost(
  event: MiddyRequest
): Promise<APIGatewayProxyResult> {
  const { id } = event.pathParameters;
  const { name, link, authorities } = event.body;

  try {
    const params = {
      TableName,
      Key: { id },
      ExpressionAttributeNames: {
        '#n': 'name'
      },
      UpdateExpression: 'SET #n = :n, link = :link, authorities = :authorities',
      ExpressionAttributeValues: {
        ':n': name,
        ':link': link,
        ':authorities': authorities
      },
      ReturnValues: 'ALL_NEW'
    };
    await dynamodb.update(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify({ id, name, link, authorities })
    };
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
}

export const handler = commonMiddleware(updateHost).use(
  validator({
    inputSchema: createHostSchema,
    ajvOptions: {
      useDefaults: true,
      strict: false
    }
  })
);
