import { Router } from "express";
import auth, { UserRole } from "../../middleWare/auth";
import { reviewsController } from "./reviews.controller";


const router = Router();

router.post(
    '/', 
    auth(UserRole.STUDENT),
    reviewsController.createReviews
    
)

export const reviewsRoutes: Router = router;