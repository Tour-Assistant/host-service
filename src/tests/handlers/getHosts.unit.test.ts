import { v4 as uuid } from 'uuid';

import { HostedBy } from 'src/types/host';
import { getHosts } from 'src/handlers/getHosts';
import { dynamodb, TableName } from 'src/lib/dbClient';
import { MiddyRequest } from 'src/types/middy';

describe('should able to get list of hosts', () => {
  const hostData: Partial<HostedBy>[] = [
    {
      id: uuid(),
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
    },
    {
      id: uuid(),
      name: 'TAB',
      link: {
        page: 'https://facebook.com/page/tab',
        group: 'https://facebook.com/group/tab'
      },
      authorities: [
        {
          name: 'kiron',
          phone: '+8801711253253'
        }
      ]
    }
  ];

  beforeEach(async () => {
    await dynamodb
      .batchWrite({
        RequestItems: {
          [TableName]: hostData.map(host => ({
            PutRequest: {
              Item: host
            }
          }))
        }
      })
      .promise();
  });

  it('should return host list', async () => {
    const event: MiddyRequest = {};
    const res = await getHosts(event);
    const hostList = JSON.parse(res.body) as HostedBy[];
    expect(hostList.length).toEqual(2);
    expect(hostList).toEqual(
      expect.arrayContaining([
        expect.objectContaining(hostData[0]),
        expect.objectContaining(hostData[1])
      ])
    );
  });
});
