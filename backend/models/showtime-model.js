import mongoose from "mongoose";
import RoomModel from './room-model.js'
import MovieModel from './movie-model.js'

const showtimeSchema = new mongoose.Schema (
    {
        movie_id:{type:mongoose.Types.ObjectId, ref:MovieModel,required:true},
        screening_room_id: {type:mongoose.Types.ObjectId,ref:RoomModel, required:true},
        date:{type:Date,required:true},
        language: {type:String, required:true},
    }
)

showtimeSchema.index({ theater_id: 1 });

showtimeSchema.index({ date: 1 });

showtimeSchema.index({ theater_id: 1, date: 1, movie_id: 1 });

const ShowtimeModel= mongoose.model("showtimes",showtimeSchema)
export default ShowtimeModel
