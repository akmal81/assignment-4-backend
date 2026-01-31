import { Router } from "express";
import { categoryController } from "./category.controller";

const router = Router();


router.get('/', categoryController.getAllCagetory)
router.get('/:categoryId', categoryController.getCategoryById)


export const categoryRouter = router;