import  dbConnect  from '../../lib/db'
import { patientModel } from '../../lib/db';
import { NextResponse } from 'next/server'

await dbConnect();

export async function POST(request) {

  const { name, age, birthday, sex, mobile, email, civilStat, address, occupation, recordDate, concern, dentist } = await request.json(); // expects patient information
  const tempPatient = new patientModel({
    name: name,
    age: age,
    birthday: birthday,
    sex: sex,
    mobile: mobile,
    email: email,
    civilStat: civilStat,
    address: address,
    occupation: occupation,
    recordDate: recordDate,
    concern: concern, 
    dentist: dentist
  });

  //save temp model to database 
  await tempPatient.save();

  return NextResponse.json({message: "created"})
  
}

export async function GET(request) {
  const patients = await patientModel.find()
  return NextResponse.json(patients)
}

export async function PUT(request){
  
  //get id of user
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('_id')

  //find user based on id
  const user = await patientModel.findById(id)

  //get updated fields
  const { name, age, birthday, sex, mobile, email, civilStat, address, occupation,concern, dentist } = await request.json(); // expects patient information

  //change fields of queried user
  if (name != undefined) user.name = name;
  if (age != undefined) user.age = age;
  if (birthday != undefined) user.birthday = birthday;
  if (sex != undefined) user.sex = sex;
  if (mobile != undefined) user.mobile = mobile;
  if (email != undefined) user.email = email;
  if (civilStat != undefined) user.civilStat = civilStat;
  if (address != undefined) user.address = address;
  if (occupation != undefined) user.occupation = occupation;
  if (concern != undefined) user.concern = concern; 
  if (dentist != undefined) user.dentist = dentist;
  
  await user.save()
  
  return NextResponse.json({user})
}

export async function DELETE(request){
  //get id of user
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('_id')

  //delete user 
  await patientModel.deleteOne({'_id': id})

  return NextResponse.json({message: "deleted"})
}