const jwt = require('jsonwebtoken');
const { Users } = require('../models/user.model');


const generateJWT = (id = '') => {

    return new Promise((resolve, reject) => {

        const payload = { id };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve(token);
            }
        })

    })
}

const checkJWT = async(token = '') => {
    try {
        if (token.length < 10 || token == undefined) {
            return null;
        }

        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await Users.findByPk(id);

        if (user) {
            return user;

        } else {
            return null;
        }

    } catch (error) {

    }
}


module.exports = {
    generateJWT,
    checkJWT
}