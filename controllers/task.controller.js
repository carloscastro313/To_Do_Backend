const { response, request } = require('express');

const { Tasks } = require('../models/task.model');

const tasksGet = async(req = request, res = response) => {

    const { headers } = req;

    try {

        const task = await Tasks.findAll({
            where: {
                FolderId: headers.id,
            }
        })

        res.json(task);


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Server error'
        })
    }
}

const tasksPost = async(req = request, res = response) => {

    const { body } = req;

    try {

        const task = new Tasks(body);
        await task.save();

        res.json(task);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Server error'
        })
    }
}

const tasksUpdate = async(req = request, res = response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const task = await Tasks.findByPk(id);

        if (!task) {
            return res.status(400).json({
                msg: 'This task does not exist'
            });
        }
        console.log(task);
        await task.update(body);

        res.json(task);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Server error'
        })
    }
}

const tasksDelete = async(req = request, res = response) => {

    const { id } = req.params;

    try {

        const task = await Tasks.findByPk(id);

        if (!task) {
            return res.status(400).json({
                msg: 'This task does not exist'
            });
        }

        await task.destroy();

        res.json(task);

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Server error'
        })
    }
}

module.exports = {
    tasksGet,
    tasksPost,
    tasksUpdate,
    tasksDelete
}