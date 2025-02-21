import Coupon from "../models/coupon-model.js";

export const getCoupons = async (req, res) => {
    let coupons;
    try {
        coupons = await Coupon.find().limit(3);
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve coupons", error });
    }
};

export const checkCoupon =async(req,res) =>{
    const { title } = req.body;

  try {
    const coupon = await Coupon.findOne({ title: title });

    if (!coupon) {
      return res.status(404).json({ message: 'Mã giảm giá không hợp lệ' });
    }

    // Kiểm tra hạn sử dụng và trạng thái của coupon
    if (new Date(coupon.exp) < new Date()) {
      return res.status(400).json({ message: 'Mã giảm giá đã hết hạn' });
    }

    res.status(200).json({ balance: coupon.balance, coupon });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};