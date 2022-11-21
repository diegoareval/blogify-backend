export default function authMiddleware(req, res, next) {
  // Get token from header
  const token = req.header('Authorization');
  // console.log(token);
  next();
}
