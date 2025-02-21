import {addTheater, deleteTheater, getAllTheater,updateTheater} from '../controllers/theater-controller.js'
import { getRoomByTheaterId } from '../controllers/room-controller.js';
import express from 'express'

const TheaterRouter = express.Router();
    TheaterRouter.get('/all',getAllTheater)
    TheaterRouter.post('/add',addTheater)
    TheaterRouter.put('/:id',updateTheater)
    TheaterRouter.delete('/:id',deleteTheater)
    TheaterRouter.get("/:id/rooms", getRoomByTheaterId);
export default TheaterRouter;