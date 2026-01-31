import { Request, Response } from "express"
import { reviewsRoutes } from "./review.router"
import { reviewServices } from "./review.service"

const createReviews = async (req: Request, res: Response) => {


    try {
       
        

        const result = await reviewServices.createReviews()
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


export const  reviewsController = {
    createReviews
}