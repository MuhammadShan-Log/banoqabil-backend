const taskModel = require("../../../../models/task");

async function addNewTask(req, res, next) {
  try {
    const { title,
      description,
      createdBy,
      userAssigned,
      sectionId,
      projectId,
      status,
      priority,
      dueDate } =
      req.body;

    const task = {
      title,
      description,
      createdBy,
      userAssigned,
      sectionId,
      projectId,
      status,
      priority,
      dueDate
    };

    const data = await taskModel.create(task);

    if (data) {
      res.status(201).json({ status: 201, msg: "Task is added.", data: data });
    } else {
      res
        .status(400)
        .json({ status: 400, msg: "Task is not added.", data: null });
    }
  } catch (err) {
    next(err);
  }
}

async function updateTask(req, res, next) {
  try {
    const taskId = req.params.id;
    const { title,
      description,
      createdBy,
      userAssigned,
      sectionId,
      projectId,
      status,
      priority,
      dueDate } =
      req.body;

    const task = {
      title,
      description,
      createdBy,
      userAssigned,
      sectionId,
      projectId,
      status,
      priority,
      dueDate
    };
    const data = await taskModel.findByIdAndUpdate(taskId, task, { new: true });

    if (data) {
      res
        .status(200)
        .json({ status: 200, msg: "Task is updated.", data: data });
    } else {
      res
        .status(400)
        .json({ status: 400, msg: "Task is not updated.", data: null });
    }
  } catch (err) {
    next(err);
  }
}

async function deleteTask(req, res, next) {
  try {
    const taskId = req.params.id;

    const data = await taskModel.findByIdAndDelete(taskId);

    if (data) {
      res
        .status(200)
        .json({ status: 200, msg: "Task is deleted.", data: data });
    } else {
      res
        .status(400)
        .json({ status: 400, msg: "Task is not deleted.", data: null });
    }
  } catch (err) {
    next(err);
  }
}

async function getTaskById(req, res, next) {
  try {
    const taskId = req.params.id;

    const data = await taskModel.findById(taskId)
      .populate('createdBy')
      .populate('userAssigned')
      .populate('sectionId')
      .populate('projectId');

    if (data) {
      res
        .status(200)
        .json({ status: 200, msg: "Task data is fetched.", data: data });
    } else {
      res
        .status(400)
        .json({ status: 400, msg: "Task data is not found.", data: null });
    }
  } catch (err) {
    next(err);
  }
}

async function getAllTasks(req, res, next) {
  try {

    const data = await taskModel.find()
      .populate('createdBy')
      .populate('userAssigned')
      .populate('sectionId')
      .populate('projectId');

    if (data) {
      res
        .status(200)
        .json({ status: 200, msg: "Task data is fetched.", data: data });
    } else {
      res
        .status(400)
        .json({ status: 400, msg: "Task data is not found.", data: null });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addNewTask,
  updateTask,
  deleteTask,
  getTaskById,
  getAllTasks
};
