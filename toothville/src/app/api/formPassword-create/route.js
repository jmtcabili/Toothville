import {formPasswordModel} from "@/app/lib/db";
import dbConnect from "@/app/lib/db";
import {NextResponse} from "next/server";
import bcrypt from "bcryptjs";


await dbConnect();

export async function POST(req){
    try{
        const {newPassword} = await req.json()
        if (newPassword.length < 6) {
            return new NextResponse.json({message: "Password should be at least 6 characters"})
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        const newFormPassword = new formPasswordModel({
            name: "password",
            password: hashedPassword,
        })
        //replace password existing password if possible

        if(await formPasswordModel.countDocuments() >= 1){
            //logic when there's an existing password
            const filter = {name: "password"}
            const updatePassword = {
                $set: {
                    password: hashedPassword,
                }
            }
            await formPasswordModel.updateOne(filter, updatePassword);
            return NextResponse.json({message: 'Password updated'})
        }
        else{
            //when there's no existing password
            await newFormPassword.save();
            return NextResponse.json({message: 'Password added'})
        }


    }catch(error){
        console.log(error)
        return NextResponse.json({message: error})
    }

}