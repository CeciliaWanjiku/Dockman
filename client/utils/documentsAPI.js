import request from 'superagent';


export function getEndpoint(endpoint) {
  const url = endpoint;
  return (
  request
    .get(url)
  );
}
