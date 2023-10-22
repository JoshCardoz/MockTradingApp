import mongoose from 'mongoose';

import dotenv from 'dotenv';
dotenv.config();


const mongoURI = process.env.mongoURL;

mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });


export default mongoose;