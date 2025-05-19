import mongoose from 'mongoose';

declare global {
    var mongoose: any;
}

const MONGODB_URI = process.env.MONGODB_URI;

//it will check if there are already any connection in cached (basically it avoids rerendering)
if(!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment'
    );
}

let cached = global.mongoose;
//checking if there is already a connection in cached
if(!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    if(cached.conn) {
        return cached.conn;
    }

    if(!cached.promise) {
        //to prevent timeout error
        const opts = {
            bufferCommands: false,
            serverSelectionTimeoutMS: 5000
        };

        cached.promise = await mongoose.connect(MONGODB_URI ?? "", opts).then((mongoose) => {
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
    }
    return cached.conn;
}

export default dbConnect;