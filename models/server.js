const express = require('express');
const cors = require('cors');

const { db } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.app.use(cors());

        this.paths = {
            user: '/user',
            login: '/login',
            folder: '/folder',
            task: '/task'
        }



        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();

    }

    async conectarDB() {
        await this.dbConnection();
    }

    async dbConnection() {

        try {

            await db.authenticate();
            console.log('Database online');

        } catch (error) {
            throw new Error(error);
        }

    }

    middlewares() {
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.paths.user, require('../routes/user.route'));
        this.app.use(this.paths.login, require('../routes/login.route'));
        this.app.use(this.paths.folder, require('../routes/folder.route'));
        this.app.use(this.paths.task, require('../routes/task.route'));
    }


    listen() {
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}




module.exports = Server;