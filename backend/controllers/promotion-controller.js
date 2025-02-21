import PromotionModel from  "../models/promotion-model.js";

export const getPromotionInHomepage = async (req, res) => {
    let promotions;
    try {
        promotions = await PromotionModel.find().limit(4);
        res.status(200).json(promotions);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve promotions", error });
    }
};

export const getAllPromo = async (req,res) => {
    let promotions;
    try {
        promotions= await PromotionModel.find();
        res.status(200).json(promotions);
    }
    catch (error) {
        res.status(500).json({message:"Failed to get all promo: ",error})
    }
}

export const addPromo =async (req,res)=>{
    try {
        const {exp,promotion,url} =req.body

        if (!exp || !promotion ||!url) {
            return res.status(400).json({ message: "Missing required fields" });
          }
        
        const newPromo=new PromotionModel({
            exp,
            promotion,
            url
        });

        const savedPromo=newPromo.save()
        res.status(201).json({ message: "Promotion added successfully", promotion: savedPromo });
        } catch (error) {
        console.error("Error adding promotion:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
        }
}