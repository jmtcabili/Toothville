import mongoose from 'mongoose'
const {Schema} = mongoose

const MONGODB_URI = process.env.MONGODB_URI


if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local',
    )
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        }
        cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
            console.log('  DB CONNECTED...')
            return mongoose
        })
    }
    try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null
        throw e
    }

    return cached.conn
}


const patientSchema = new Schema ({
    name: String, 
    nickname: String,
    age: Number, 
    birthday: Date, 
    sex: String, 
    mobile: String,
    email: String,
    civilStat: String, 
    address: String, 
    occupation: String,
    guardianName: String, 
    recordDate: Date, 
    dentist: String,
})

const patientModel = mongoose.models.patient || mongoose.model("patient", patientSchema);

export { patientModel }; 
export default dbConnect


