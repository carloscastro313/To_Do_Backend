const { response, request } = require('express');

const { Folders } = require('../models/folder.model');
const { Tasks } = require('../models/task.model');

const foldersGet = async(req = request, res = response) => {

    const { headers } = req;

    try {

        const folders = await Folders.findAll({
            where: {
                UserId: headers.id,
            }
        })

        res.json(folders);


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Server error'
        })
    }
}

const foldersPost = async(req = request, res = response) => {

    const { body } = req;

    try {

        const exist = await Folders.findOne({
            where: {
                UserId: body.UserId,
                FolderName: body.FolderName
            }
        })

        if (exist) {
            return res.status(400).json({
                msg: 'There is already one with the name ' + body.FolderName
            });
        }

        const folder = new Folders(body);

        await folder.save();

        res.json(folder);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Server error'
        })
    }
}

const foldersDelete = async(req = request, res = response) => {

    const { id } = req.params;

    try {

        const folder = await Folders.findByPk(id);

        if (!folder) {
            return res.status(400).json({
                msg: 'This folder does not exist'
            });
        }
        await Tasks.destroy({
            where: {
                FolderId: folder.id
            }
        });

        await folder.destroy();

        res.json(folder);

    } catch (error) {

        res.status(500).json({
            msg: 'Server error',
            error
        })
    }
}

module.exports = {
    foldersGet,
    foldersPost,
    foldersDelete
}