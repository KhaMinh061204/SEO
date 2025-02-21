import express from "express"
import { createTicket } from "../controllers/ticket-controller.js";
import authMiddleware from "../middlewares/auth-middlewares.js";

const ticketRouter = express.Router();
    ticketRouter.post("/",authMiddleware,createTicket);
    
export default ticketRouter;