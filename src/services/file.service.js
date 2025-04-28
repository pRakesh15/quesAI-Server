import { File } from "../model/file.model.js";
import { Project } from "../model/project.model.js";


export const getFilesByProject = async (projectId, userId) => {
  // Verify project exists and belongs to user
  const project = await Project.findOne({ _id: projectId, user: userId });
  if (!project) {
    throw new Error('Project not found');
  }
 
  return await File.find({ project: projectId }).sort({ updatedAt: -1 });
};

export const getFileById = async (fileId, userId) => {
  const file = await File.findOne({ _id: fileId, user: userId });
  if (!file) {
    throw new Error('File not found');
  }
  return file;
};

export const createFile = async (name,transcript,projectId, userId) => {
  // Verify project exists and belongs to user
  const project = await Project.findOne({ _id: projectId, user: userId });
  if (!project) {
    throw new Error('Project not found');
  }
  
  const file = await File.create({
    name: name,
    transcript: transcript,
    project: projectId,
    user: userId
  });
  
  return file;
};

export const updateFile = async (fileId, fileData, userId) => {
  const file = await File.findOne({ _id: fileId, user: userId });
  if (!file) {
    throw new Error('File not found');
  }
  
  file.name = fileData.name || file.name;
  file.transcript = fileData.transcript || file.transcript;
  file.updatedAt = Date.now();
  
  await file.save();
  return file;
};

export const deleteFile = async (fileId, userId) => {
  const file = await File.findOne({ _id: fileId, user: userId });
  if (!file) {
    throw new Error('File not found');
  }
  
  await File.findByIdAndDelete(fileId);
  
  return { message: 'File deleted successfully' };
};