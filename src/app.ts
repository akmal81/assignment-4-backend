import express, { Application } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { tutorRoter } from "./modules/tutor/tutor.route";
import { bookingRoute } from "./modules/bookTutoringSession/booking.router";
import { reviewsRoutes } from "./modules/reviews/review.router";

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



app.get('/', (req, res)=>{
    res.send("Server Ready")
})



export default app;