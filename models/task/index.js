const mongoose = require("mongoose");

const taskStatus = require("../../enums/taskStatus");
const taskPriority = require('../../enums/taskPriority')

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],

    },
    description: {
      type: String,
      required: [true, "Description is required."],
    },
    position: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required to create the task."],
    },
    userAssigned: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User is required in order to assign the task."],
      ref: "User",
    },
    sectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'taskSection',
      required: [true, "Section id is required."],
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: [true, "Project id is required."],
    },
    status: {
      type: String,
      enum: Object.values(taskStatus),
      default: taskStatus.ToDo,
    },
    priority: {
      type: String,
      enum: Object.values(taskPriority),
      default: taskPriority.Low

    },
    dueDate: {
      type: String,
      required: [true, "Due date is required."],
    },
  },
  { timestamps: true }
);

const taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;
