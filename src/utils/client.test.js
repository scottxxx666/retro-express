import Client from './client';
import ResourceNotFoundError from '../errors/resource-not-found';

jest.mock('../aws');

describe('find', () => {
  let client;

  beforeEach(() => {
    client = new Client();
  });

  test('Given non-existed data Should throw Error', async () => {
    givenCorrespondingDataCount(0);
    await expect(client.find('params')).rejects.toStrictEqual(new ResourceNotFoundError);
  });

  test('Given existed data Should query and return first item', async () => {
    givenCorrespondingData(['item1', 'item2']);
    expect(await client.find('params')).toBe('item1');
  });

  function givenCorrespondingDataCount(count) {
    jest.spyOn(client, 'query').mockImplementation(() => {
      return { promise: () => ({ Count: count }) };
    });
  }

  function givenCorrespondingData(items) {
    jest.spyOn(client, 'query').mockImplementation(() => {
      return { promise: () => ({ Items: items }) };
    });
  }
});