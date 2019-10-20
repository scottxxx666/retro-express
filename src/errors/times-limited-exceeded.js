export default class TimesLimitExceededError extends Error {
  status = 403;

  message = 'times limit exceed';
}
