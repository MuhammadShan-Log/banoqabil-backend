const projectModel = require("../../../../models/project");


async function addNewProject(req, res, next) {
    try {
        const { title,
            description,
            projectCreatedBy,
            dueDate,
            projectStatus } = req.body;

        const Project = {
            title,
            description,
            projectCreatedBy,
            dueDate,
            projectStatus,
        };

        const data = await projectModel.create(Project);

        if (data) {
            res
                .status(201)
                .json({ status: 201, msg: "Project is added.", data: data });
        } else {
            res
                .status(400)
                .json({ status: 400, msg: "Project is not added.", data: null });
        }
    } catch (err) {
        next(err);
    }
}

async function updateProject(req, res, next) {
    try {
        const projectId = req.params.id;
        const { title,
            description,
            projectCreatedBy,
            dueDate,
            projectStatus, } = req.body;

        const Project = {
            title,
            description,
            projectCreatedBy,
            dueDate,
            projectStatus,
        };

        const data = await projectModel.findByIdAndUpdate(projectId, Project, {
            new: true,
        });

        if (data) {
            res
                .status(200)
                .json({ status: 200, msg: "Project is updated.", data: data });
        } else {
            res
                .status(400)
                .json({ status: 400, msg: "Project is not updated.", data: null });
        }
    } catch (err) {
        next(err);
    }
}

async function deleteProject(req, res, next) {
    try {
        const projectId = req.params.id;

        const data = await projectModel.findByIdAndDelete(projectId);

        if (data) {
            res
                .status(200)
                .json({ status: 200, msg: "Project is deleted.", data: data });
        } else {
            res
                .status(400)
                .json({ status: 400, msg: "Project is not deleted.", data: null });
        }
    } catch (err) {
        next(err);
    }
}

async function getProjectById(req, res, next) {
    try {
        const ProjectId = req.params.id;

        const data = await projectModel
            .findById(ProjectId)
            .populate("projectCreatedBy")

        if (data) {
            res
                .status(200)
                .json({ status: 200, msg: "Project is fetched.", data: data });
        } else {
            res
                .status(400)
                .json({ status: 400, msg: "Project is not found.", data: null });
        }
    } catch (err) {
        next(err);
    }
}

async function getAllProjects(req, res, next) {
    try {
        const data = await projectModel.find().populate("projectCreatedBy");

        if (data) {
            res
                .status(200)
                .json({ status: 200, msg: "Project is fetched.", data: data });
        } else {
            res
                .status(400)
                .json({ status: 400, msg: "Project is not found.", data: null });
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    addNewProject,
    updateProject,
    deleteProject,
    getProjectById,
    getAllProjects,
};
