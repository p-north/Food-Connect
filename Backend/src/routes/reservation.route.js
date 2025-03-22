import express from "express"
import { verifyToken } from "../middlewares/verifyToken"
import {handleCreateReservation, handleDonorReservations, handleRecipientReservations, handleReservationUpdate} from "../controllers/reservation.controller.js"

const router = express.Router();


// view all of a Donor's reservations
router.get("/donor", verifyToken, handleDonorReservations);
// view all of a Recipient's reservations
router.get("/recipient", verifyToken, handleRecipientReservations);
// create a new reservation for a foodpost, done by recipients
/*
    body: { food_post_id, donor_id }
*/
router.post("/", verifyToken, handleCreateReservation);


// update a existing reservation status, done by the DONOR only.
// Example, change from pending to confirmed
//  new Date(Date.now() + 24 * 60 * 60 * 1000)
/*
    body {status: 'confirmed', 'cancelled', OR 'completed'}

*/
router.put("/:reservationID", verifyToken, handleReservationUpdate);




export default router;