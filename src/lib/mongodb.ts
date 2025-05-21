import mongoose, { Connection, ConnectOptions } from 'mongoose';

const MONGODB_URI = process.env.DATABASE_URI!;
const MONGODB_NAME = process.env.DATABASE_NAME!;

if (!MONGODB_URI || !MONGODB_NAME) {
  throw new Error('Please define the MONGODB_URI and MONGODB_NAME environment variables inside .env');
}

// Connection configuration
const MAX_POOL_SIZE = 50; // Adjust based on your server capacity
const SERVER_SELECTION_TIMEOUT_MS = 5000;
const SOCKET_TIMEOUT_MS = 30000;
const CONNECT_TIMEOUT_MS = 10000;

interface Cached {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

declare global {
  var mongoose: Cached;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: ConnectOptions = {
      dbName: MONGODB_NAME,
      maxPoolSize: MAX_POOL_SIZE,
      serverSelectionTimeoutMS: SERVER_SELECTION_TIMEOUT_MS,
      socketTimeoutMS: SOCKET_TIMEOUT_MS,
      connectTimeoutMS: CONNECT_TIMEOUT_MS,
      retryWrites: true,
      retryReads: true,
    };

    // Enable query optimization
    mongoose.set('bufferCommands', false);
    mongoose.set('bufferTimeoutMS', 2000);
    
    // Performance optimizations
    mongoose.set('toJSON', { virtuals: true, getters: true });
    mongoose.set('toObject', { virtuals: true, getters: true });

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

// Handle process termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
});

export { connectDB }