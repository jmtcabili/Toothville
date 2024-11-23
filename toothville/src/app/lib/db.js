import mongoose from 'mongoose'
import dentalChart from '../home/patients/[id]/dental-chart/page'
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

const ToothSchema = new mongoose.Schema({
    top: {type: String},
    left: {type: String}, 
    right:  {type: String}, 
    mid: {type: String},
    bottom: {type: String}, 
    type: {type: String},
    area: {type: String},
    toothNum: {type: Number}
})

const patientSchema = new Schema ({
    personalInformation: {
        title: String,
        firstName: String,
        middleInitial: String,
        lastName: String,
        nickname: String,
        dob: Date,
        address: String,
        suite: String,
        city: String,
        province: String,
        postalCode: String,
    },
    contactInformation: {
        homePhone: String,
        cellularPhone: String,
        businessPhone: String,
        email: String,
        preferredContact: String,
        occupation: String,
        guardianName: String,
        guardianPhone: String,
    },
    emergencyContacts: [
        {
            name: String,
            relation: String,
            phone: String,
        },
    ],
    familyDoctor: {
        name: String,
        phone: String,
        address: String,
    },
    specialist: {
        name: String,
        phone: String,
        address: String,
    },
    pharmacy: {
        name: String,
        number: String,
    },
    identification: {
        driversLicenseNumber: String,
        ohipNumber: String,
    },
    insurance: {
        dentalInsurance: Boolean,
        employer: String,
        primaryInsurancePolicy: String,
        secondaryInsurancePolicy: String,
    },
    referralSource: String,
    medicalHistory: {
        treatedMedicalCondition: String,
        treatedMedicalReason: String,
        lastMedicalCheckup: Date,
        healthChange: String,
        healthChangeReason: String,
        medications: String,
        medicationsList: String,
        allergies: {
            medications: String,
            latexRubberMetals: String,
            others: String,
        },
        adverseReaction: Boolean,
        reactionExplanation: String,
        asthma: Boolean,
        heartIssues: Boolean,
        heartSurgery: Boolean,
    },
    concern: String, 
    dentist: String,
    signatures: {
        patientSignature: {
            type: String,
            required: true,
            maxlength: 500000, // Adjust this based on the expected size of the Base64 string
        },
        dentistSignature: {
            type: String,
            required: true,
            maxlength: 500000,
        },
    },
    
    //initialize to length 32

    dentalChart: {
        Upper_Right: [ToothSchema],
        Upper_Left: [ToothSchema],
        Lower_Right: [ToothSchema],
        Lower_Left: [ToothSchema]        
    },
    
})

const notesSchema = new Schema ({
    patientID: String,
    date: Date, 
    procedureName: String, 
    comment: String, 
})

const patientModel = mongoose.models.patient || mongoose.model("patient", patientSchema);
const notesModel = mongoose.models.patientNote || mongoose.model("patientNote", notesSchema);

export { patientModel}; 
export { notesModel };
export default dbConnect


