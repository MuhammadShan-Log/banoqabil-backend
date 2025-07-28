const mongoose = require("mongoose");

const sectionSchema = mongoose.Schema(
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
      required: [true, "User is required in order to create section."],
    },
  },
  {
    timestamps: true,
  }
);

const sectionModel = new mongoose.model("taskSection", sectionSchema);

module.exports = sectionModel;
