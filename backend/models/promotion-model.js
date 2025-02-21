import mongoose from "mongoose";

const PromotionSchema = new mongoose.Schema(
    {
        exp:{type:Date, required:true},
        promotion:{type:String, required:true},
        url:{type:String,required:true}
    }
)

const PromotionModel= mongoose.model("promotions",PromotionSchema)
export default PromotionModel