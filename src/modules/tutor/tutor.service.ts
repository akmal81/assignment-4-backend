import { TutorProfiles } from "../../generated/prisma/client";
import { TutorProfilesWhereInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

// const createTutorProfile = async (payload:TutorProfiles, userId:string) => {
const createTutorProfile = async (data: Omit<TutorProfiles, "id" | "createdAt" | "updatedAt" | "userId">, userId: string) => {



    const result = await prisma.tutorProfiles.create(
        {
            data: {
                ...data,
                userId: userId
            }
        }
    )

    return result
}

// const getAllTutor = async (payload: {
//     search?: string | undefined;
//      average_rating?: number | undefined;
//      hourly_rate?: number | undefined;
// }) => {
//     const andConditions: TutorProfilesWhereInput[] = [];

//     if (payload.search) {
//         andConditions.push(
//             {
//                 OR: [
//                     {
//                         subject: {
//                             contains: payload.search as string,
//                             mode: "insensitive"
//                         }
//                     }
//                 ]
//             }
//         )
//     }
//     if (typeof payload.average_rating === "number") {
//         andConditions.push(
//             {
//                 OR: [
//                     {
//                         average_rating: {
//                             gte: payload.average_rating 

//                         }
//                     }
//                 ]
//             }
//         )
//     }

//     if (typeof payload.hourly_rate === "number") {
//         andConditions.push(
//             {
//                 OR: [
//                     {
//                         hourly_rate: {
//                             gte: payload.hourly_rate 

//                         }
//                     }
//                 ]
//             }
//         )
//     }

//     const allTutor = await prisma.tutorProfiles.findMany(
//         {
//             where: {
//                 AND: andConditions
//             }
//         }
//     )
//     return allTutor
// }


const getAllTutor = async (payload: {
    search?: string
    average_rating?: number
    hourly_rate?: number
    category?: string
}) => {
    const andConditions: TutorProfilesWhereInput[] = []


    if (payload.search) {
        andConditions.push({
            subject: {
                contains: payload.search,
                mode: "insensitive"
            }
        })
    }


    if (typeof payload.average_rating === "number") {
        andConditions.push({
            average_rating: {
                equals: payload.average_rating
            }
        })
    }


    if (typeof payload.hourly_rate === "number") {
        andConditions.push({
            hourly_rate: {
                equals: payload.hourly_rate
            }
        })
    }

    if (payload.category) {
        andConditions.push({
            category: {
                name: {
                    contains: payload.category,
                    mode: "insensitive"
                }
            }
        })
    }

    return prisma.tutorProfiles.findMany({
        where: {
            AND: andConditions
        },
        include: {
            category: true
        }
    })
}



export const tutorService = {
    createTutorProfile,
    getAllTutor
}