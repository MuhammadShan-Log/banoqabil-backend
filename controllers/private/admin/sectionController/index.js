const sectionModel = require("../../../../models/taskSection");

async function addNewSection(req, res, next) {
  try {
    const { title, description, createdBy } = req.body;

    const section = {
      title,
      description,
      createdBy,
    };

    const data = await sectionModel.create(section);

    if (data) {
      res
        .status(201)
        .json({ status: 201, msg: "Section is added.", data: data });
    } else {
      res
        .status(400)
        .json({ status: 400, msg: "Section is not added.", data: null });
    }
  } catch (err) {
    next(err);
  }
}

async function updateSection(req, res, next) {
  try {
    const sectionId = req.params.id;
    const { title, description, createdBy } = req.body;

    const section = {
      title,
      description,
      createdBy,
    };

    const data = await sectionModel.findByIdAndUpdate(sectionId, section, {
      new: true,
    });

    if (data) {
      res
        .status(200)
        .json({ status: 200, msg: "Section is updated.", data: data });
    } else {
      res
        .status(400)
        .json({ status: 400, msg: "Section is not updated.", data: null });
    }
  } catch (err) {
    next(err);
  }
}

async function deleteSection(req, res, next) {
  try {
    const sectionId = req.params.id;

    const data = await sectionModel.findByIdAndDelete(sectionId);

    if (data) {
      res
        .status(200)
        .json({ status: 200, msg: "Section is deleted.", data: data });
    } else {
      res
        .status(400)
        .json({ status: 400, msg: "Section is not deleted.", data: null });
    }
  } catch (err) {
    next(err);
  }
}

async function getSectionById(req, res, next) {
  try {
    const sectionId = req.params.id;

    const data = await sectionModel
      .findById(sectionId)
      .populate("createdBy")

    if (data) {
      res
        .status(200)
        .json({ status: 200, msg: "Section is fetched.", data: data });
    } else {
      res
        .status(400)
        .json({ status: 400, msg: "Section is not found.", data: null });
    }
  } catch (err) {
    next(err);
  }
}

async function getAllSections(req, res, next) {
  try {
    const data = await sectionModel.find().populate("createdBy");

    if (data) {
      res
        .status(200)
        .json({ status: 200, msg: "Section is fetched.", data: data });
    } else {
      res
        .status(400)
        .json({ status: 400, msg: "Section is not found.", data: null });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addNewSection,
  updateSection,
  deleteSection,
  getSectionById,
  getAllSections,
};
