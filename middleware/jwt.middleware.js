const { response, request } = require('express');
const { checkJWT } = require('../helpers/jwt.helper');

const checkToken = async(req = request, res = response, next) => {

    const { token } = req.headers;

    try {
        const exist = await checkJWT(token);

        if (exist == null) {
            return res.status(400).json({
                msg: 'Token expired'
            });
        }

        next();

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Error server'
        })
    }
}

module.exports = {
    checkToken
}