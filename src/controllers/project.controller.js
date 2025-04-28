import { createProject, getAllProjects, getProjectById } from "../services/project.service.js";

export const getAllProjectsController = async (req, res) => {
    try {
        const userId=req.user?._id
      const projects = await getAllProjects(userId);
      res.status(200).json({
        success: true,
        count: projects.length,
        data: projects
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
  
  export const getProjectByIdController = async (req, res) => {
    try {
        const userId=req.user?._id;
     const projectId=req.params.id;
      const project = await getProjectById(projectId, userId);
      res.status(200).json({
        success: true,
        data: project
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  };
  
  export const createProjectController = async (req, res) => {
    try {
        const {name}=req.body;
        const userId=req.user?._id;
      const project = await createProject(name,userId);
      res.status(201).json({
        success: true,
        message:"project created",
        data: project
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  };