export default function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  const { status = 500, message = 'Something is wrong!' } = err;
  return res.status(status).json({ message });
}