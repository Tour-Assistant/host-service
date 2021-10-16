import { v4 as uuid } from 'uuid';

import { HostedBy } from 'src/types/host';
import { getHostById } from 'src/handlers/getHost';
import { dynamodb, TableName } from 'src/lib/dbClient';

describe('should able to get list of tours', () => {
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
    const res = await getHostById(id);
    expect(res).toEqual(hostData);
  });
});
