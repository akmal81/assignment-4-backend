import { Request, Response } from "express"
import { setTimeSlotService } from "./setTimeSlot.service"

const setTimeSlot = async (req: Request, res: Response) => {


    try {

        const user = req.user;

        if (!user) {
            return res.status(400).json(
                {
                    error: "unauthorized",

                }
            )
        }


        const result = await setTimeSlotService.setTimeSlot(req.body, user.id as string)
        res.status(201).json(result)

    } catch (err) {
        res.status(400).json(
            {
                error: "Time slot create failed!!",
                details: err
            }
        )
    }
}


const setAvailabilitySlot = async (req: Request, res: Response) => {


    try {
        const slotId = req.params.slotId;

        console.log(slotId)
        const { isBooked } = req.body
        const user = req.user;

        if (!user) {
            return res.status(400).json(
                {
                    error: "unauthorized",

                }
            )
        }


        const result = await setTimeSlotService.setAvailabilitySlot(slotId as string, user.id as string, isBooked as boolean)
        res.status(201).json(result)

    } catch (err) {
        res.status(400).json(
            {
                error: "Time slot create failed!!",
                details: err
            }
        )
    }
}








export const setTimeSlotController = {
    setTimeSlot, setAvailabilitySlot
}