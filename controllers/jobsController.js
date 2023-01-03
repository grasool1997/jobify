import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import CustomAPIError from "../errors/custom-api.js";
import mongoose from "mongoose";
const createJob = async (req, res) => {
  const { company, position } = req.body;

  if (!company || !position) {
    throw new CustomAPIError(
      "Please provide company name and job position",
      StatusCodes.BAD_REQUEST
    );
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);

  console.log(job);
  res.status(StatusCodes.CREATED).json({ job });
};
const deleteJob = async (req, res) => {
  res.send("deleteJob");
};
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  const totalJobs = await Job.countDocuments({});
  res.status(StatusCodes.OK).json({
    jobs,
    totalJobs,
  });
};
const updateJob = async (req, res) => {
  res.send("updateJob");
};
const showStats = async (req, res) => {
  let result = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  result = result.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  res.status(StatusCodes.OK).json(result);
};

export { createJob, deleteJob, getAllJobs, updateJob, showStats };
