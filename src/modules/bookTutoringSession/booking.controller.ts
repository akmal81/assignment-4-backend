import { Request, Response } from "express"
import { UserRole } from "../../middleWare/auth"
import { bookingService } from "./booking.service"

const careateBooking = async (req: Request, res: Response) => {


    try {


        try {
            const user = req.user

            if (!user) {
                return res.status(400).json(
                    {
                        error: "You are not authorize please login"
                    }
                )
            }
            if (user?.role !== UserRole.STUDENT) {
                return res.status(400).json(
                    {
                        error: "Please Register as a Student",
                    }
                )
            }
            req.body.studentId = req.user?.id
            const result = await bookingService.careateBooking(req.body)
            res.status(201).json(result)

        } catch (err) {
            res.status(400).json(
                {
                    error: "Profile careation failed!!",
                    details: err
                }
            )
        }


    } catch (err) {
        res.status(400).json(
            {
                error: "Profile careation failed!!",
                details: err
            }
        )
    }


}



export const bookingController = {
    careateBooking
}