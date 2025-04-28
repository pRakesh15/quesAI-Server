import express from "express";
import { isAuthenticate } from "../middlewares/auth.js";
import { createProjectController, getAllProjectsController, getProjectByIdController } from "../controllers/project.controller.js";

const router = express.Router();

//make all the routs protected

router.use(isAuthenticate);

router.post("/createProject",createProjectController)
router.get("/getAll",getAllProjectsController)
router.get("/:id",getProjectByIdController)

export default router;