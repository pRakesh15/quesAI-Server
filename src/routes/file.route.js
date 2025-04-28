import express from "express";
import { isAuthenticate } from "../middlewares/auth.js";
import { createFileController, getFileByIdController, getFilesByProjectController } from "../controllers/file.controller.js";

const router = express.Router();

//make all the routs protected

router.use(isAuthenticate);
router.get('/project/:projectId',getFilesByProjectController)
router.post('/createFile/:projectId',createFileController)
router.get('/fileById/:fileId',getFileByIdController)


export default router;