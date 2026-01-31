import { Router } from "express";
import { tutorController } from "./tutor.controller";
import auth, { UserRole } from "../../middleWare/auth";

const router = Router();


router.get(
    '/', 
    tutorController.getAllTutor
)

router.get(
    '/:tutorId', 
    tutorController.getTutorById
)



router.post(
    '/', 
    auth(UserRole.TUTOR) ,
    tutorController.createTutorProfile
)


router.patch(
    '/:tutorId', 
    auth(UserRole.TUTOR),
    tutorController.updateTutor
)

export const tutorRoter: Router = router;