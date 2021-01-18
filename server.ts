require('dotenv').config();
import express from 'express';
import mongoose from "mongoose";
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
        const db_URL = process.env.MONGO_DB_URL;
        mongoose.connect(db_URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }).then(() => {
            console.log("mongodb database is connected");
        }).catch(err => {
            console.log("Database Connection Failed");
        });
    };

    configBodyParser() {

    };

    setRoutes() {
        // Assets
        this.app.use(express.static(path.join(__dirname, 'public')));

        // Set Template Engine
        this.app.use(expressLayout);
        this.app.set('views', path.join(__dirname, '/resources/views'));
        this.app.set('view engine', 'ejs');

        // Routes
        this.app.use('/', WebRoutes);
    };

    error404Handler() {

    };

    handleError() {

    };
};
