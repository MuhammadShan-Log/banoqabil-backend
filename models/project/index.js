const mongoose = require("mongoose");

const projectStatus = require("../../enums/projectStatus");
const { unitToPixels } = require("puppeteer");

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    projectCreatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "User Id is required to create the project."],
    },
    dueDate: {
      type: String,
      required: [true, "Due date is required."],
    },
    projectStatus: {
      type: String,
      required: [true, "Project status is required."],
      enum: Object.values(projectStatus),
      default: projectStatus.OnTrack,
    },
  },
  {
    timestamps: true,
  }
);

const projectModel = new mongoose.model("Project", projectSchema);

module.exports = projectModel;
