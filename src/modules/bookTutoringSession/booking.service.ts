import { Result } from "pg";
import { prisma } from "../../lib/prisma"

const careateBooking = async (
    payload: {
        studentId: string;
        slotId: string;
        tutorProfilesId: string;
    }

) => {

    const result = await prisma.booking.create(
        {
            data: {
                slotId: payload.slotId,
                studentId: payload.studentId,
                tutorProfilesId: payload.tutorProfilesId
            },
        }
    )

    if (result) {
        await prisma.availabilitySlot.update(
            {
                where: {
                    id: payload.slotId
                },
                data: {
                    isBooked: true
                }
            }
        )
    }

    return result
}


const getBookings = async (studentId: string) => {
    const result = await prisma.booking.findMany({
        where: {
            studentId: studentId,
        },
        include: {
            tutorProfiles: {
                select: {
                    name: true,
                    hourly_rate: true,
                    average_rating: true,
                    subject: true,
                },
            },
            slot: {
                select: {
                    date: true,
                    startTime: true,
                    endTime: true,
                },
            },
        },
    });

    return result;
};


export const bookingService = {
    careateBooking,
    getBookings
}