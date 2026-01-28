import { Request, Response } from "express";
import { UserRole } from "../../middleWare/auth";
import { tutorService } from "./tutor.service";
import { number } from "better-auth";

const createTutorProfile = async (req: Request, res: Response) => {


    try {
        const user = req.user

        if (!user) {
            return res.status(400).json(
                {
                    error: "You are not authorize please login"
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


const getAllTutor = async (req: Request, res: Response) => {
    try {

        const { search, rating, price, category, isFeatured } = req.query;

        const payload: {
            search?: string
            average_rating?: number
            hourly_rate?: number
            category?: string
            isFeatured?:boolean
        } = {}

        if (typeof search === "string") {
            payload.search = search
        }

        if (typeof rating === "string" && !isNaN(Number(rating))) {
            payload.average_rating = Number(rating)
        }

        if (typeof price === "string" && !isNaN(Number(price))) {
            payload.hourly_rate = Number(price)
        }

        if (typeof category === "string") {
            payload.category = category
        }

        const result = await tutorService.getAllTutor(payload)
        res.status(200).json(result)

        // const searchString = typeof search === 'string' ? search : undefined
        // const average_rating = typeof rating === "string" && !isNaN(Number(rating))
        // ? Number(rating)
        // : undefined
        // const hourly_rate = typeof price === "string" && !isNaN(Number(price))
        // ? Number(price)
        // : undefined

        // const result = await tutorService.getAllTutor({search:searchString, average_rating, hourly_rate})
        //  res.status(201).json(result)

    } catch (err) {
        res.status(400).json(
            {
                error: "Profile careation failed!!",
                details: err
            }
        )
    }
}

const getTutorById = async (req: Request, res: Response) => {

    try {
        const { tutorId } = req.params 


        const result = await tutorService.getTutorById(tutorId as string)
        res.status(201).json(result)

    } catch (error) {
        res.status(400).json(
            {
                error: "Profile careation failed!!",
                details: error
            }
        )
    }

}


export const tutorController = {
    createTutorProfile,
    getAllTutor,
    getTutorById

}