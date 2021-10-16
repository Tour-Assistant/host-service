import { APIGatewayProxyResult } from 'aws-lambda';
import createError from 'http-errors';

import commonMiddleware from 'src/lib/commonMiddleware';
import { MiddyRequest } from 'src/types/middy';
import { HostedBy } from 'src/types/host';
import { dynamodb, TableName } from 'src/lib/dbClient';

export const getHostById = async (id: string): Promise<HostedBy> => {
  const params = {
    TableName,
    Key: { id }
  };

  let host;

  try {
    const { Item } = await dynamodb.get(params).promise();
    host = Item as HostedBy;
    if (!host) {
      throw new createError.NotFound(`Host with id ${id} not found!`);
    }
    return host;
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }
};

async function getHost(event: MiddyRequest): Promise<APIGatewayProxyResult> {
  const { id } = event.pathParameters;
  const host = await getHostById(id);
  return {
    statusCode: 201,
    body: JSON.stringify(host)
  };
}

export const handler = commonMiddleware(getHost);
