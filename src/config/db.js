import mongoose from 'mongoose';
import { db_connection } from './env';

export const connectDB = async () => {
  try {
    console.log('Establishing Connection ...');
    await mongoose.connect(db_connection, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('MongoDB Connected successfully...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
