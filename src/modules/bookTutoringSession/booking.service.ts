import { Booking } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const careateBooking = async(payload:{

    studentId:string
    tutorId:string
    price:number
   
}
) => {

    // return await prisma.booking.create(
    //     {
    //         data:payload
    //     }
    // )
}


export const bookingService = {
careateBooking
}