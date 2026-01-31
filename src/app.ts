import express, { Application } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { tutorRoter } from "./modules/tutor/tutor.route";
import { bookingRoute } from "./modules/bookTutoringSession/booking.router";
import { reviewsRoutes } from "./modules/reviews/review.router";
import { categoryRouter } from "./modules/category/category.route";
import { setTimeSlot } from "./modules/availableSlot/setTimeSlot.route";


const app:Application = express();

app.use(cors(
    {
        origin:process.env.APP_URL || "http://localhost:3000",
        credentials:true
    }
))

app.use(express.json())


app.all("/api/auth/*splat", toNodeHandler(auth));

app.use('/api/v1/tutors',  tutorRoter)

app.use('/api/v1/bookings',  bookingRoute)

app.use('/api/v1/reviews', reviewsRoutes)

app.use('/api/v1/categories', categoryRouter)

app.use('/api/v1/set-time-slot', setTimeSlot)



app.get('/', (req, res)=>{
    res.send("Server Ready")
})



export default app;