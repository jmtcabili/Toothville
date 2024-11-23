import  dbConnect  from '../../lib/db'
import { patientModel } from '../../lib/db';
import { NextResponse } from 'next/server'

await dbConnect();  

export async function POST(request) {


		/*
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
	*/
	const {personalInformation, 
					contactInformation, 
					emergencyContacts, 
					familyDoctor, 
					specialists, 
					pharmacy, 
					identification, 
					insurance, 
					medicalHistory,
					concern,
					signatures,
					dentist
	} = await request.json()

	let dentalChart = []
	const end = false; 
	const areas = ["Upper Right", "Upper Left", "Lower Right", "Lower Left"]
	let areaIdx = 0;
	let toothIdx = 0; 


	for (i = 0; i = areas.length; i++){
		let permNum = i + 5; 
		
	}
	//initializer upper right
	
	for (let i = 5; i > 0; i=-4){
		var numTeeth = (i == 5) ? 5 : 8
		var type = (i == 5) ? "Temporary" : "Permanent"
		for (let j = 1; j <= numTeeth; j++) {
			dentalChart[toothIdx] = {
				top: "Normal",
				left: "Normal",
				right: "Normal",
				mid: "Normal",
				bottom: "Normal",
				type: type, 
				area: "Upper Right",
				toothNum: i*10 + j
			}
			toothIdx++;
		}
	}
		
	for (let i = 1; i <= 8; i++){
		var num = (i >= 5) ? 5 : 8
		var type = (i >= 5) ? "Temporary" : "Permanent"
		for (let j = 1; j <= num; j++) {
			dentalChart[toothIdx] = {
				top: "Normal",
				left: "Normal",
				right: "Normal",
				mid: "Normal",
				bottom: "Normal",
				type: type, 
				area: areas[areaIdx],
				toothNum: i*10 + j
			}
			toothIdx++;
		}
		areaIdx = (areaIdx == 3) ? 0 : areaIdx+=1
	}
	
	const tempPatient = new patientModel({
			personalInformation: personalInformation,
			contactInformation: contactInformation, 
			emergencyContacts: emergencyContacts, 
			familyDoctor: familyDoctor, 
			specialists: specialists, 
			pharmacy: pharmacy, 
			identification: identification, 
			insurance: insurance, 
			medicalHistory: medicalHistory,
			concern: concern,
			signatures,
			dentist: dentist,
			dentalChart: dentalChart
	});
	
	await tempPatient.save() 
	

	return NextResponse.json({message: "created", user: tempPatient})
	
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
