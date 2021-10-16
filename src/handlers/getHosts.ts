import { APIGatewayProxyResult } from 'aws-lambda';
import createError from 'http-errors';

import { dynamodb, TableName } from 'src/lib/dbClient';
import commonMiddleware from 'src/lib/commonMiddleware';
import { MiddyRequest } from 'src/types/middy';

export async function getHosts(
  event: MiddyRequest
): Promise<APIGatewayProxyResult> {
  const params = {
    TableName
  };
  try {
    const { Items } = await dynamodb.scan(params).promise();
    return {
      statusCode: 201,
      body: JSON.stringify(Items)
    };
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
}

export const handler = commonMiddleware(getHosts);
