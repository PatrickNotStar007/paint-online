import express from "express";
import drawingController from "../controllers/drawingController";

const drawingRouter = express.Router();

drawingRouter.post("/image", drawingController.postImage);
drawingRouter.get("/image", drawingController.getImage);

export default drawingRouter;
