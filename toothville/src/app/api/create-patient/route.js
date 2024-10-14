import  dbConnect  from '../../lib/db'
import { patientModel } from '../../lib/db';
import { NextResponse } from 'next/server'

export async function POST(request) {
    
    await dbConnect();
    const {name, age, sex, dentist} = await request.json(); //expects patient information
    const tempPatient = new patientModel({
      name: name, 
      age: age, 
      sex: sex, 
      dentist: dentist
    });

    //save temp model to database 
    await tempPatient.save();

    return NextResponse.json({message: "hatdog"})
  }