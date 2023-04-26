const Project = require('../model/Project');

const getAllProjects = async (req, res) => {
    const projects = await Project.find().populate('userId');
    if (!projects) return res.status(204).json({ 'message': 'No employees found.' });
    res.json(projects);
}

const createNewProject = async (req, res) => {
    if (!req?.body?.title || !req?.body?.manager || !req?.body?.planStart || !req?.body?.planEnd) {
        return res.status(400).json({ 'message': 'One of the fields is empty' });
    }

    try {
        const result = await Project.create({
            title: req.body.title,
            manager: req.body.manager,
            planStart: req.body.planStart,
            planEnd: req.body.planEnd,
            userId: req.body._id
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateProject = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const project = await Project.findOne({ _id: req.body.id }).exec();
    if (!project) {
        return res.status(204).json({ "message": `No employee matches ID ${req.body.id}.` });
    }
    if (req.body?.title) project.title = req.body.title;
    if (req.body?.manager) project.manager = req.body.manager;
    if (req.body?.planStart) project.planStart = req.body.planStart;
    if (req.body?.planEnd) project.planEnd = req.body.planEnd;
    const result = await project.save();
    res.json(result);
}

const deleteProject = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Project ID required.' });

    const project = await Project.findOne({ _id: req.body.id }).exec();
    if (!project) {
        return res.status(204).json({ "message": `No project matches ID ${req.body.id}.` });
    }
    const result = await project.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getProject = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Project ID required.' });

    const project = await Project.findOne({ _id: req.params.id }).exec();
    if (!project) {
        return res.status(204).json({ "message": `No project matches ID ${req.params.id}.` });
    }
    res.json(project);
}

module.exports = {
    getAllProjects,
    createNewProject,
    updateProject,
    deleteProject,
    getProject
}