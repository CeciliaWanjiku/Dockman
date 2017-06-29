import request from 'superagent';


export const getEndpoint = (endpoint) => {
  const url = endpoint;
  return (
  request
    .get(url)
  );
};
export const putEndpoint = (endpoint) => {
  const url = endpoint;
  return (
    request
    .put(url)
  );
};
export const postEndpoint = (endpoint) => {
  const url = endpoint;
  return (
    request
    .post(url)
  );
};
export const deleteEndpoint = request.delete;
