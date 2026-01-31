import { Router } from "express";
import auth, { UserRole } from "../../middleWare/auth";
import { setTimeSlotController } from "./setTimeSlot.controller";

const router = Router();


router.post('/',  auth(UserRole.TUTOR), setTimeSlotController.setTimeSlot)
router.patch('/:slotId',  auth(UserRole.TUTOR), setTimeSlotController.setAvailabilitySlot)

export const setTimeSlot = router;