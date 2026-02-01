
import { AvailabilitySlot } from "../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const setTimeSlot = async (data:
    Omit<AvailabilitySlot, "id" |  "isBooked" | "createdAt" | "updatedAt">,

    userId: string

) => {

    console.log(userId)

    const tutorId = await prisma.tutorProfiles.findFirstOrThrow({
        where: {
            userId: userId,

        },
        select: {
            id: true
        }
    })

    return await prisma.availabilitySlot.create(
        {

            data: {
                ...data,
                tutorId: tutorId.id
            }
        }

    )
}

// Set availability slots

const setAvailabilitySlot = async (
    slotId:string,
    userId:string,
   isBookedStatus: boolean
) => {

    const tutorProfile  = await prisma.tutorProfiles.findFirst({
        where: {userId:userId}
    })

    if (!tutorProfile) {
        throw new Error("Tutor profile not found!");
    }
    
    return await prisma.availabilitySlot.update({
        where:{
            id:slotId,
            tutorId: tutorProfile.id
        },
        data:{
            isBooked:isBookedStatus
        }
    })
}



export const setTimeSlotService = {
    setTimeSlot,
    setAvailabilitySlot
}