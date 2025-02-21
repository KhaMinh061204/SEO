import express from "express"
import { checkCoupon, getCoupons } from "../controllers/coupon-controller.js";

const couponRouter = express.Router();
    couponRouter.get("/",getCoupons);
    couponRouter.post("/check",checkCoupon)
export default couponRouter;