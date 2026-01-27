import { TutorProfiles } from "../../generated/prisma/client";
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




export const tutorService = {
    createTutorProfile
}