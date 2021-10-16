import { v4 as uuid } from 'uuid';
import moment from 'moment';

import { MiddyRequest } from 'src/types/middy';
import { HostedBy } from 'src/types/host';
import { updateHost } from 'src/handlers/updateHost';
import { dynamodb, TableName } from 'src/lib/dbClient';

describe('can create host', () => {
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

  it('should update the host', async () => {
    const updatedHostData = {
      name: 'Updated Name',
      link: {
        page: 'https://facebook.com/updated-page/hitthetrail',
        group: 'https://facebook.com/updated-group/hitthetrail'
      },
      authorities: [
        {
          name: 'Updated Name',
          phone: '+8801711253253'
        }
      ]
    };
    const event: MiddyRequest = {
      pathParameters: {
        id
      },
      body: updatedHostData
    };
    const res = await updateHost(event);
    expect(res.statusCode).toEqual(201);
    const { Item: host } = await dynamodb
      .get({ TableName, Key: { id } })
      .promise();
    expect(host).toEqual({ id, ...updatedHostData });
  });
});
