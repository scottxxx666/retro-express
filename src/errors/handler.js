export default function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  const { message } = err;
  return res.status(err.status).json({ message });
}