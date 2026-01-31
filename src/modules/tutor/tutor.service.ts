
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



// Browse and search tutors by subject, rating, and price
// Filter tutors by category
const getAllTutor = async (payload: {
    search?: string
    average_rating?: number
    hourly_rate?: number
    category?: string
    isFeatured?: boolean
    userId?:string
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

    // if (payload.isFeatured === true) {
    //     andConditions.push({
    //         isFeatured: {
    //             equals: payload.isFeatured
    //         }
    //     })
    // }

   if (typeof payload.isFeatured === 'boolean') {

        const { isFeatured } = payload
        andConditions.push(
            {
                isFeatured:isFeatured
            }
        )
    }


    
    if (typeof payload.userId === "string") {
        andConditions.push({
            userId: {
                contains: payload.userId,
                mode: "insensitive"
            }
        })

        return prisma.tutorProfiles.findFirst(
            {
                where:{
                    userId:payload.userId
                }
            }
        )
    }


    

    return prisma.tutorProfiles.findMany({
        where: {
            AND: andConditions
        },
        include: {
            category: true,
            user:{
                select:{
                    name:true
                }
            },
            reviews: true
        }

    })
}

// View detailed tutor profiles with reviews

const getTutorById = async (tutorId: string) => {

    const result = await prisma.tutorProfiles.findUnique(
        {
            where: {
                id: tutorId
            },
            include: {
                user:{
                    select:{
                        name:true
                    }
                },
                reviews: true
            },
            
        }
    )


    return result
}

const updateTutor = async (tutorId:string, data: Partial<TutorProfiles>, authorId:string) => {

    console.log(tutorId, data, authorId)

   

    
    const tutorData = await prisma.tutorProfiles.findUniqueOrThrow(
        {
            where:{
                id:tutorId
            },
            select:{
                id:true
            }
        }
    )


    const result = prisma.tutorProfiles.update(
        {
            where:{
                id:tutorData.id
            },
            data
        }
    )

    return result
}


export const tutorService = {
    createTutorProfile,
    getAllTutor,
    getTutorById,
    updateTutor
   
}