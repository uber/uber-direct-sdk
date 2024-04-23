import { getHeaders, makeQueryString } from '../../utils';

describe('getHeaders', () => {
  it('should return the correct headers when passed an access token and GET method', () => {
    const headers = getHeaders('access-token', 'GET');
    expect(headers).toEqual({
      Authorization: 'Bearer access-token',
    });
  });

  it('should return the correct headers when passed an access token and POST method', () => {
    const headers = getHeaders('access-token', 'POST');
    expect(headers).toEqual({
      Authorization: 'Bearer access-token',
      'Content-Type': 'application/json',
    });
  });
});

describe('makeQueryString', () => {
  it('should return the correct query string when passed an object', () => {
    const queryString = makeQueryString({ key: 'value' });
    expect(queryString).toEqual('?key=value');
  });
});
