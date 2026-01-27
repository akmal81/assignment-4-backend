import { Request, Response } from "express";
import { UserRole } from "../../middleWare/auth";
import { tutorService } from "./tutor.service";

const createTutorProfile = async (req: Request, res: Response,) => {


    try {
        const user = req.user

        if(!user){
            return res.status(400).json(
                {
                    error:"You are not authorize please login"
                }
            )
        }
        if (user?.role !== UserRole.TUTOR) {
            return res.status(400).json(
                {
                    error: "Please Register as a tutor",
                }
            )
        }

        const result = await tutorService.createTutorProfile(req.body, user.id)
        console.log(result)
        res.status(201).json(result)

    } catch (err) {
        res.status(400).json(
            {
                error: "Profile careation failed!!",
                details: err
            }
        )
    }


}


export const tutorController ={
    createTutorProfile
}