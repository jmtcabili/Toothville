import dbConnect from "../../lib/db";
import { proceduresModel } from "../../lib/db";
import { NextResponse } from 'next/server'

await dbConnect();


export async function POST(request) {
    //make sure values are checked on front send side. 
    const { name, category, price } = await request.json();

    const existingProcedure = await proceduresModel.findOne({name: name, category:category})

    if (existingProcedure || price < 0 || typeof(price) != 'number'){
        return NextResponse.json({status: false})
    }

    const newProcedure = new proceduresModel({
        name: name, 
        category: category, 
        price: price
    });

    await newProcedure.save();

    return NextResponse.json({status: true, procedure: newProcedure});
}

export async function GET() {
    //get all procedures
    
    const procedures = await proceduresModel.find({});

    return NextResponse.json(procedures);
}

export async function PUT (request){
    //get id from front end 
    const {id, newName, newCategory, newPrice} = await request.json();

    //search procedure by id
    const procedure = await proceduresModel.findById(id);

    //update details of the procedure 
    procedure.name = newName;
    procedure.category = newCategory;
    procedure.price = newPrice;
    
    await procedure.save(); //save updated procedure

    return NextResponse.json({status: true, procedure: procedure});
}

export async function DELETE(request){
    //get id from front end
    const {id} = await request.json();

    //check if it exists
    const procedure = await proceduresModel.findById(id);

    if (procedure){
        //delete procedure
        await proceduresModel.deleteOne({'_id': id});
        return NextResponse.json({status: true, msg: "procedure deleted"});
    }
    return NextResponse.json({status: false, msg: "procedure not found"});
    
}