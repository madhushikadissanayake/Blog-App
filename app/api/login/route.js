import { ConnectDB } from "@/lib/config/db";
import User from "@/lib/models/UserModels";
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await ConnectDB();
        const {email, password} = await request.json()
        const userExistence = await User.findOne({email})
        if(!userExistence) {
            return NextResponse.json({error: "user not existed"})
        }
        const checkPassword = await bcrypt.compare(password, userExistence.password)

       if(!checkPassword) {
         return NextResponse.json({error: "wrong Password"}, {status: 401})
       }

        return NextResponse.json({message: "success"}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}