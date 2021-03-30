const { response, request } = require('express');

const { Users } = require('../models/user.model');

const createAccount = async(req = request, res = response) => {

    const { body } = req;

    try {

        const user = new Users(body);
        await user.save();

        res.json(user);


    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Error server',
            error
        })
    }
}



module.exports = {
    createAccount
}