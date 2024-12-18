import {formPasswordModel} from "@/app/lib/db";
import dbConnect from "@/app/lib/db";
import {NextResponse} from "next/server";
import bcrypt from "bcryptjs";


await dbConnect();

export async function POST(req) {
    try {
        //user submits password
        const {inputPassword} = await req.json()

        //get password in db
        const password = (await formPasswordModel.findOne()).password
        const validPassword = await bcrypt.compare(inputPassword, password)
        if (validPassword) {
            return NextResponse.json({message: "password correct", status: true})
        }else{
            return NextResponse.json({message: "password incorrect", status: false})
        }
    }catch (error){
        console.log(error)
        return NextResponse.json({message: error, status: false})
    }



}