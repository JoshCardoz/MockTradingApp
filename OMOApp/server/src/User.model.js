import { Double } from 'mongodb';
import mongoose from 'mongoose';

const tokenBalanceSchema = new mongoose.Schema({
  tokenCA: String, 
  tokenName: String,
  balance: Number,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  USDBalance: Number,
  tokenBalances: [], 
});

const User = mongoose.model('User', userSchema);

export default User;