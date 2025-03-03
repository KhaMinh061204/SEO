import express, { Router } from "express";
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routers/user-router.js";
import movieRouter from "./routers/movie-router.js"
import couponRouter from "./routers/coupon-router.js"
import AccountRouter from "./routers/auth-router.js";
import SeatRouter from "./routers/seat-router.js";
import PromotionRouter from "./routers/promotion-router.js";
import FoodRouter from "./routers/food-router.js";
import TheaterRouter from "./routers/theater-router.js";
import bookingRouter from "./routers/booking-router.js";
import ticketRouter from "./routers/ticket-router.js";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const swaggerDocument = YAML.load("./swagger.yaml");

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.1qcpp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() =>
        app.listen(8081, () => {
            console.log("Connected to Database and Server is running")
        }
        )
    )
    .catch((e) => console.log(e));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/user", userRouter);
app.use("/movie", movieRouter);
app.use("/coupon", couponRouter);
app.use("/account", AccountRouter);
app.use("/seat", SeatRouter);
app.use("/promotion", PromotionRouter)
app.use("/food", FoodRouter)
app.use("/theater", TheaterRouter)
app.use("/ticket", ticketRouter)
app.use("/booking", bookingRouter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));



