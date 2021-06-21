/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from 'node-fetch';

const fetchData = (url: string, method: string, data: any) => {
  const initRequest =
    method === 'GET'
      ? { method }
      : {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        };
  return fetch(url, initRequest);
};
export default fetchData;
