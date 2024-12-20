import {formPasswordModel} from "@/app/lib/db";
import dbConnect from "@/app/lib/db";
import {NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET;

await dbConnect();

export async function POST(req) {
    try {
        //user submits password
        const {inputPassword} = await req.json()

        //get password in db
        const password = (await formPasswordModel.findOne()).password
        const validPassword = await bcrypt.compare(inputPassword, password)
        if (validPassword) {
            const token_forms = jwt.sign({user: "patient"}, JWT_SECRET, {expiresIn: 60*60})
            return new Response (
                JSON.stringify({message: "password correct", status: true}),
                {
                    status: 200,
                    headers: {
                        "Set-Cookie": `token_forms=${token_forms}; HttpOnly; Path=/form; Max-Age=1800`,
                    },
                }
            ); 
        }else{
            return NextResponse.json({message: "password incorrect", status: false})
        }
    }catch (error){
        console.log(error)
        return NextResponse.json({message: error, status: false})
    }



}