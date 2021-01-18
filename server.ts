import express from 'express';
import expressLayout from 'express-ejs-layouts';
import path from 'path';
import WebRoutes from './routes/WebRoutes';

export class Server {
    public app: express.Application = express();

    constructor() {
        this.setConfiguration();

        this.setRoutes();

        this.error404Handler();

        this.handleError();
    }

    setConfiguration() {
        this.connectMongoDB();

        this.configBodyParser();
    }

    connectMongoDB() {

    };

    configBodyParser() {

    };

    setRoutes() {
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(expressLayout);
        this.app.set('views', path.join(__dirname, '/resources/views'));
        this.app.set('view engine', 'ejs');
        this.app.use('/', WebRoutes);
    };

    error404Handler() {

    };

    handleError() {

    };
};
