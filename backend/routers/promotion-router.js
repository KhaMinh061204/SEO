import express from "express"
import { addPromo, getAllPromo, getPromotionInHomepage } from "../controllers/promotion-controller.js";

const PromotionRouter = express.Router();
    PromotionRouter.get("/",getPromotionInHomepage);
    PromotionRouter.get("/all",getAllPromo);
    PromotionRouter.post("/add",addPromo)
export default PromotionRouter;