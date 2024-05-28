import mongoose from 'mongoose';

const connectDB = async (DATABASE_URL) => {
    try {
        const DB_OPTIONS = {
            dbName: "EMS",
         
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log('Database Connected Successfully :-) ');
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

export default connectDB;

