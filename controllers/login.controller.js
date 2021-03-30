const { request, response } = require('express');

const { Users } = require('../models/user.model');

const { generateJWT } = require('../helpers/jwt.helper');

const login = async(req, res = response) => {

    const { body } = req;

    try {

        const user = await Users.findOne({
            where: {
                email: body.email
            }
        });

        if (!user) {
            return res.status(400).json({
                msg: 'Email does not exist'
            });
        }


        if (user.password !== body.password) {
            return res.status(400).json({
                msg: 'The password is incorrect'
            });
        }

        // Generar el JWT
        const token = await generateJWT(user.id);

        res.json({
            user: {
                id: user.id,
                username: user.username,
            },
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Server error'
        });
    }

}

module.exports = {
    login
}