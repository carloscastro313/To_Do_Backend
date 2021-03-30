const { response, request } = require('express');

const { Users } = require('../models/user.model');

const checkEmail = async(req = request, res = response, next) => {

    const { body } = req;

    try {

        const exist = await Users.findOne({
            where: {
                email: body.email
            }
        });

        if (exist) {
            return res.status(400).json({
                msg: 'This email has been already taken'
            });
        }

        next();

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Error server',
            error
        })
    }
}

const checkUserName = async(req = request, res = response, next) => {

    const { body } = req;

    try {

        const exist = await Users.findOne({
            where: {
                username: body.username
            }
        });

        if (exist) {
            return res.status(400).json({
                msg: 'This username has been already taken'
            });
        }

        next();

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Error server',
            error
        })
    }
}

module.exports = {
    checkEmail,
    checkUserName
}