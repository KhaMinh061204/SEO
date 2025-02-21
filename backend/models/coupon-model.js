import mongoose from "mongoose";

const couponSchema = new mongoose.Schema (
    {
        title:{type:String,required:true},
        description:{type:String,required:true},
        exp:{type:Date,required:true},
        balance: {type:Number, required:true},
    }
)

const CouponModel= mongoose.model("coupons",couponSchema)
export default CouponModel;