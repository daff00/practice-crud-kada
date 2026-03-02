export const logger = (req, res, next) => {
  console.log(`[LOG] Time: ${new Date().toISOString()} | Method: ${req.method} | Path: ${req.originalUrl}`);
  next();
};