import mongoose, { Connection, ConnectOptions } from 'mongoose';

const MONGODB_URI = process.env.DATABASE_URI!
const MONGODB_NAME = process.env.DATABASE_NAME!

if (!MONGODB_URI || !MONGODB_NAME) {
  throw new Error('Please define the MONGODB_URI and MONGODB_NAME environment variable inside .env')
}



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
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
      },
      retryWrites: true,
      w: 'majority',
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
      family: 4,
      ssl: true,
      retryReads: true,
      minPoolSize: 0,
      maxIdleTimeMS: 120000
    };

    try {
      // Use the original SRV URI directly
const mongoUrl = MONGODB_URI;
      console.log('Attempting MongoDB connection...');
      cached.promise = mongoose.connect(mongoUrl, opts)
        .then((mongoose) => {
          console.log('Connected to MongoDB successfully');
          return mongoose.connection;
        })
        .catch((error) => {
          console.error('MongoDB connection error details:', {
            message: error.message,
            code: error.code,
            name: error.name,
            reason: error.reason
          });
          throw error;
        });
    } catch (error) {
      console.error('MongoDB connection error:', error);
      throw error;
    }
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export { connectDB }