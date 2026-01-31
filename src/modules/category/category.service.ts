import { prisma } from "../../lib/prisma"



const getAllCagetory = async () => {
    return await prisma.category.findMany()
}


const getCategoryById = async (categoryId:string) => {

const id = Number(categoryId)

if (isNaN(id)) {
    throw new Error("Invalid category id")
  }

   return await prisma.category.findUnique(
    {
        where:{
            id:id
        }
    }
   )
}

export const categoryService = {
    getCategoryById, getAllCagetory
}