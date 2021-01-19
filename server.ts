require('dotenv').config();
import express from 'express';
import mongoose, { Collection, mongo } from "mongoose";
import expressLayout from 'express-ejs-layouts';
import path from 'path';
import WebRoutes from './routes/WebRoutes';
import session from 'express-session';
import flash from 'express-flash';
import connectMongo from 'connect-mongo';

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

        this.globalMiddleware();
    }

    connectMongoDB() {
        const db_URL = process.env.MONGO_DB_URL;
        mongoose.connect(db_URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }).then(() => {
            console.log('MongoDB Database Connected....');
        }).catch(err => {
            console.log('MongoDB Connection Failed.....');
        });
    };

    globalMiddleware() {
        // Session Store
        const MongoStore = connectMongo(session);
        let MongoDbStore = new MongoStore({
            mongooseConnection: mongoose.connection,
            collection: 'sessions'
        });

        // Session Config
        this.app.use(session({
            secret: process.env.COOKIE_SECRET,
            resave: false,
            store: MongoDbStore,
            saveUninitialized: false,
            cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
        }));

        // Express flash
        this.app.use(flash());

        // Assets
        this.app.use(express.static(path.join(__dirname, 'public')));

        // JSON Config
        this.app.use(express.json());

        // Global Middlewares
        this.app.use((req, res, next) => {
            res.locals.session = req.session;
            next();
        });

        // Set Template Engine
        this.app.use(expressLayout);
        this.app.set('views', path.join(__dirname, '/resources/views'));
        this.app.set('view engine', 'ejs');
    };

    setRoutes() {
        // Routes
        this.app.use('/', WebRoutes);
    };

    error404Handler() {

    };

    handleError() {

    };
};
