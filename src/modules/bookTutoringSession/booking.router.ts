import { Router } from "express";
import auth, { UserRole } from "../../middleWare/auth";
import { bookingController } from "./booking.controller";

const router = Router();

router.get(
    '/',
    auth(UserRole.STUDENT),
    bookingController.getBookings
);


router.get(
    '/:studentId', 
    auth(UserRole.STUDENT),
    bookingController.careateBooking
);

export const bookingRoute: Router = router;