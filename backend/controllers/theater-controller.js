import TheaterModel from "../models/theater-model.js";
import TheaterBrandModel from "../models/theaterbrand-model.js";

export const getAllTheater = async (req, res) =>{
    let theaters;
    try{
        theaters = await TheaterModel.find().populate('brand_id', 'name'); 
        res.status(200).json(theaters);
    }
    catch (error) {
        res.status(500).json({message:"Failed to get all theater: ",error})
    }
}

export const addTheater = async (req, res) => {
  try {
    const { name, location, brandName,img } = req.body;

    // Kiểm tra đầu vào
    if (!name || !location || !brandName ||!img) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const brand = await TheaterBrandModel.findOne({ name: brandName });
    if (!brand) {
      return res.status(400).json({ message: "Brand not found" });
    }
    // Tạo rạp chiếu mới
    const newTheater = new TheaterModel({
      name,
      location,
      brand_id:brand._id,
      img
    });

    const savedTheater = await newTheater.save();
    res.status(201).json({ message: "Theater added successfully", theater: savedTheater });
  } catch (error) {
    console.error("Error adding theater:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTheater = async (req, res) => {
  const { id } = req.params; // Lấy ID từ URL
  const { name, location,img,brandName } = req.body; // Dữ liệu mới từ request body

  try {
    const brand = await TheaterBrandModel.findOne({ name: brandName });
    if (!brand) {
      return res.status(400).json({ message: "Brand not found" });
    }

    const updatedTheater = await TheaterModel.findByIdAndUpdate(
      id, 
      { name, location,img, brand_id:brand._id }, 
      { new: true, runValidators: true } // Trả về bản ghi đã cập nhật
    );

    if (!updatedTheater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    res.status(200).json(updatedTheater);
  } catch (error) {
    res.status(500).json({ message: "Failed to update theater", error });
  }
};

export const deleteTheater = async (req, res) => {
  const { id } = req.params; 

  try {
    const deletedTheater = await TheaterModel.findByIdAndDelete(id);

    if (!deletedTheater) {
      return res.status(404).json({ message: "Theater not found" });
    }

    res.status(200).json({ message: "Theater deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete theater", error });
  }
};