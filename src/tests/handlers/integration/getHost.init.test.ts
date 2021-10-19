import { v4 as uuid } from 'uuid';

import { HostedBy } from 'src/types/host';
import { handler as getHost } from 'src/handlers/getHost';
import { dynamodb, TableName } from 'src/lib/dbClient';
import { APIGatewayEvent, Context } from 'aws-lambda';

describe('should able to get list of hosts', () => {
  const id = uuid();
  const hostData: Partial<HostedBy> = {
    id,
    name: 'Hit The Trail',
    link: {
      page: 'https://facebook.com/page/hitthetrail',
      group: 'https://facebook.com/group/hitthetrail'
    },
    authorities: [
      {
        name: 'Masum',
        phone: '+8801711253253'
      },
      {
        name: 'Mamun',
        phone: '+8801722253253'
      }
    ]
  };
  beforeEach(async () => {
    await dynamodb
      .put({
        TableName,
        Item: hostData
      })
      .promise();
  });

  it('should return host by id', async () => {
    const event = {
      pathParameters: {
        id
      }
    } as unknown as APIGatewayEvent;
    const context = {} as Context;
    const { statusCode, body } = await getHost(event, context, undefined);
    expect(statusCode).toEqual(201);
    expect(JSON.parse(body)).toEqual(hostData);
  });

  it('should throw error for invalid id', async () => {
    const randomId = uuid();
    const event = {
      pathParameters: {
        id: randomId
      }
    } as unknown as APIGatewayEvent;
    const context = {} as Context;
    try {
      const res = await getHost(event, context, undefined);
    } catch (error) {
      expect(error.message.message).toEqual(
        `Host with id ${randomId} not found!`
      );
    }
  });
});
