import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token){ 
    console.log('No token provided');
    return res.status(401).json({ message: 'Access denied' });}

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) {
      console.log(`error verifying: ${err}`);
      return res.status(403).json({ message: 'Invalid token' });}
    req.user = user;
    next();
  });
};

export default authenticateToken;