import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(req:Request){
    try {
        await dbConnect();
        const body = await req.json();
        const {fname, email, password, profilePicture} = body;
        if(!fname || !email || !password || !profilePicture){
            NextResponse.json({message: "All fields are required"}, {status: 400})
        }

        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            return NextResponse.json({message:"User already exits"}, {status: 409})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const profilePic = `https://avatar.iran.liara.run/public/boy?username=${fname}`
        const newUser = await UserModel.create({
            fname,
            email,
            password: hashedPassword,
            profilePicture: profilePic,
            isVerified: false
        })

        return NextResponse.json({message: "User created successfully", 
            user:{Username: newUser.fname, email: newUser.email}}, 
            {status: 200})

    } catch (error) {
        console.log("Error while signUp: ", error);
        NextResponse.json({message: "error while signing up", error:error})
    }
}
