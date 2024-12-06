import  dbConnect  from '../../lib/db'
import { patientModel } from '../../lib/db';
import { NextResponse } from 'next/server'

await dbConnect();  

export async function POST(request) {

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
					dentist,
					dateRecorded,
	} = await request.json()

	let dentalChart = {
        Upper_Right: [], 
        Upper_Left: [],
        Lower_Right: [],
        Lower_Left: []
    }

	const end = false; 
	const areas = ["Upper Right", "Upper Left", "Lower Left", "Lower Right"]
	let areaIdx = 0;
    let toothIdx = 0;

	//initialize upper right	
	for (let i = 5; i > 0; i-=4){
		var numTeeth = (i == 5) ? 5 : 8
		var type = (i == 5) ? "Temporary" : "Permanent"
		for (let j = numTeeth; j >= 1; j--) {
			dentalChart.Upper_Right[toothIdx] = {
				top: "Normal",
				left: "Normal",
				right: "Normal",
				mid: "Normal",
				bottom: "Normal",
				type: type, 
				toothNum: i*10 + j
			}
			toothIdx++;
		}
	}

    //initialize upper left
    toothIdx = 0;
    for (let i = 6; i > 0; i-=4){
		var numTeeth = (i == 6) ? 5 : 8
		var type = (i == 6) ? "Temporary" : "Permanent"
		for (let j = 1; j <= numTeeth; j++) {
			dentalChart.Upper_Left[toothIdx] = {
				top: "Normal",
				left: "Normal",
				right: "Normal",
				mid: "Normal",
				bottom: "Normal",
				type: type, 
				toothNum: i*10 + j
			}
			toothIdx++;
		}
	}
    //initializer lower right 
    toothIdx = 0;
    for (let i = 4; i <= 8; i+=4){
		var numTeeth = (i ==8) ? 5 : 8
		var type = (i == 8) ? "Temporary" : "Permanent"
		for (let j = numTeeth; j >= 1; j--) {
			dentalChart.Lower_Right[toothIdx] = {
				top: "Normal",
				left: "Normal",
				right: "Normal",
				mid: "Normal",
				bottom: "Normal",
				type: type, 
				toothNum: i*10 + j
			}
			toothIdx++;
		}
	}

    //initializer lower left 
    toothIdx = 0;
    for (let i = 3; i <= 7; i+=4){
		var numTeeth = (i ==7) ? 5 : 8
		var type = (i == 7) ? "Temporary" : "Permanent"
		for (let j = 1; j <= numTeeth; j++) {
			dentalChart.Lower_Left[toothIdx] = {
				top: "Normal",
				left: "Normal",
				right: "Normal",
				mid: "Normal",
				bottom: "Normal",
				type: type, 
				toothNum: i*10 + j
			}
			toothIdx++;
		}
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
			signatures: signatures,
			dentist: dentist,
			dentalChart: dentalChart,
			dateRecorded: dateRecorded,
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
	const { name, age, birthday, sex, mobile, email, civilStat, address, occupation, concern, dentist, signatures } = await request.json(); // expects patient information

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
	if (signatures != undefined) user.signatures = signatures;
	
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
