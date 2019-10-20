export default class ResourceNotFoundError extends Error {
  status = 404;

  message = 'resource not found';
}
