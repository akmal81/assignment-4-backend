import { Request, Response } from "express";
import { categoryService } from "./category.service";



const getAllCagetory = async (req: Request, res: Response) => {

    try {
      
        const result = await categoryService.getAllCagetory()
         res.status(201).json(result)
    } catch (err) {
        res.status(400).json(
            {
                error: "Data fetch faild",
                details: err
            }
        )
    }
}

const getCategoryById = async (req: Request, res: Response) => {

    try {
        const {categoryId} = req.params
        const result = await categoryService.getCategoryById(categoryId as string)
         res.status(201).json(result)
    } catch (err) {
        res.status(400).json(
            {
                error: "Data fetch faild",
                details: err
            }
        )
    }
}

export const categoryController ={
    getCategoryById, getAllCagetory
}