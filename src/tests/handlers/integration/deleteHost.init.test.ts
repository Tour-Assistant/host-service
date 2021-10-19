import { v4 as uuid } from 'uuid';
import { APIGatewayEvent, Context } from 'aws-lambda';

import { HostedBy } from 'src/types/host';
import { handler as deleteHostHandler } from 'src/handlers/deleteHost';
import { dynamodb, TableName } from 'src/lib/dbClient';

describe('should delete host', () => {
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
    await deleteHostHandler(event, context, undefined);
    const { Item: host } = await dynamodb
      .get({ TableName, Key: { id } })
      .promise();
    expect(host).toEqual(undefined);
  });
});
