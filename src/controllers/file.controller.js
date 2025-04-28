import { createFile, deleteFile, getFileById, getFilesByProject, updateFile } from "../services/file.service.js";


//get all files of a project by project id.
export const getFilesByProjectController = async (req, res) => {
  try {
    const projectId=req.params.projectId;
    const userId=req?.user._id;
    const files = await getFilesByProject(projectId,userId );
    res.status(200).json({
      success: true,
      count: files.length,
      data: files
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

//get single file by file id.
export const getFileByIdController = async (req, res) => {
  try {
    const fileId=req.params.fileId;
    const userId=req?.user._id;
    const file = await getFileById(fileId,userId);
    res.status(200).json({
      success: true,
      data: file
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

export const createFileController = async (req, res) => {
  try {
    const {name,transcript}=req.body;
    const projectId=req.params.projectId;
    const userId=req?.user._id;
    const file = await createFile(name,transcript,projectId, userId);
    res.status(201).json({
      success: true,
      data: file
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const updateFileController = async (req, res) => {
  try {
    const file = await updateFile(req.params.fileId, req.body, req.user._id);
    res.status(200).json({
      success: true,
      data: file
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteFileController = async (req, res) => {
  try {
    const result = await deleteFile(req.params.fileId, req.user._id);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};