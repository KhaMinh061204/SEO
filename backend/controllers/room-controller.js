import RoomModel from "../models/room-model.js";
import TheaterModel from "../models/theater-model.js";
import mongoose from "mongoose";


export const getRoomByTheaterId = async (req, res) => {
    const { id: theaterId } = req.params; // Lấy theaterId từ tham số URL

    // Kiểm tra xem theaterId có hợp lệ không
    if (!mongoose.Types.ObjectId.isValid(theaterId)) {
        return res.status(400).json({ message: "Invalid Theater ID" });
    }

    try {
        // Kiểm tra xem theaterId có tồn tại không
        const theater = await TheaterModel.findById(theaterId);
        if (!theater) {
            return res.status(404).json({ message: "Theater not found" });
        }

        // Truy vấn để lấy danh sách các phòng thuộc rạp
        const rooms = await RoomModel.find({ theater_id: theaterId });

        // Nếu không có phòng nào, trả về thông báo
        if (rooms.length === 0) {
            return res.status(404).json({ message: "No rooms found for this theater" });
        }

        // Trả về danh sách các phòng
        return res.status(200).json({
            message: "Rooms fetched successfully",
            rooms: rooms,
        });
    } catch (error) {
        // Xử lý lỗi
        return res.status(500).json({
            message: "Failed to fetch rooms",
            error: error.message,
        });
    }
};