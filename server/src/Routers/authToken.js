import jwt from "jsonwebtoken";

import dotenv from 'dotenv';
dotenv.config();

const JWTkey = process.env.jwtkey;

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token){ 
    console.log('No token provided');
    return res.status(401).json({ message: 'Access denied' });}

  jwt.verify(token, JWTkey, (err, user) => {
    if (err) {
      console.log(`error verifying: ${err}`);
      return res.status(403).json({ message: 'Invalid token' });}
    req.user = user;
    next();
  });
};

export default authenticateToken;
