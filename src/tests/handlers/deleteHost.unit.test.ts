import { v4 as uuid } from 'uuid';

import { HostedBy } from 'src/types/host';
import { deleteHost } from 'src/handlers/deleteHost';
import { dynamodb, TableName } from 'src/lib/dbClient';
import { MiddyRequest } from 'src/types/middy';

describe('should delete tour', () => {
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
    const event: MiddyRequest = {
      pathParameters: {
        id
      }
    };
    await deleteHost(event);
    const { Item: host } = await dynamodb
      .get({ TableName, Key: { id } })
      .promise();
    expect(host).toEqual(undefined);
  });
});
