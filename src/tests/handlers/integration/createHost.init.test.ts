import { HostedBy } from 'src/types/host';
import { handler as createHostHandler } from 'src/handlers/createHost';
import { APIGatewayEvent, Context } from 'aws-lambda';

describe('can create host', () => {
  let hostData: Partial<HostedBy>;
  it('create a host', async () => {
    hostData = {
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

    const event = {
      body: hostData
    } as unknown as APIGatewayEvent;
    const context = {} as Context;
    const res = await createHostHandler(event, context, undefined);
    const { host: newHost } = JSON.parse(res.body);
    expect(newHost.name).toEqual(hostData.name);
    expect(newHost.link.page).toEqual(hostData.link.page);
    expect(newHost.link.group).toEqual(hostData.link.group);
    expect(newHost.authorities).toHaveLength(hostData.authorities.length);
    expect(newHost.authorities).toEqual(
      expect.arrayContaining([
        expect.objectContaining(hostData.authorities[0]),
        expect.objectContaining(hostData.authorities[1])
      ])
    );
  });
});
