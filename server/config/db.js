

import mongoose from 'mongoose';

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Database connected');

    mongoose.connection.on('error', (err) => {
      console.error('Database error:', err);
    });
  } catch (e) {
    console.error('Database connected failed:', e.message);
  }
}

export default connectDB;
