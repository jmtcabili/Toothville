import dbConnect from "@/app/lib/db";
import { appCodeModel } from "@/app/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

await dbConnect();

export async function POST(req) {

    try{
        const {appCode} = await req.json();

        const encryptedCode = await bcrypt.hash(appCode, 12);
        const newAppCode = {
            code: encryptedCode,
        }
        if (await appCodeModel.countDocuments() >= 1){
            await appCodeModel.findOneAndReplace({}, newAppCode);
            return NextResponse.json({message : "Code updated"});
        } else{
            await newAppCode.save();
            return NextResponse.json({message : "Code added"});
        }
    }catch (error){
        console.log(error)
        return NextResponse.json({message: error})
    }
    
}

export async function PUT(req) {
    try{
        const {inputCode} = await req.json();
        const appCode = (await appCodeModel.findOne()).code;
        const res = await bcrypt.compare(inputCode, appCode);
        console.log(appCode);
        
        return NextResponse.json({message: res})
    }catch(error){
        console.log(error)
        return NextResponse.json({message: error})
    }
}
