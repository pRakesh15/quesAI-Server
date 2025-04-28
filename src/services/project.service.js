import { Project } from "../model/project.model.js";


export const getAllProjects = async (userId) => {
  return await Project.find({ user: userId }).sort({ updatedAt: -1 });
};

export const getProjectById = async (projectId, userId) => {
  const project = await Project.findOne({ _id: projectId, user: userId });
  if (!project) {
    throw new Error('Project not found');
  }
  return project;
};

export const createProject = async (name, userId) => {
  const project = await Project.create({
    name: name,
    user: userId
  });
  return project;
};