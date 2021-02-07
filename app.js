require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");

const db = require('./models');
const Role = db.roles;

mongoose.connect(`${process.env.MONGO_CONN}${process.env.MONGO_DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    auth: {
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASS
    }
}).then(data => {
    console.log('Database Connected.')
    initial()
}).catch(err => {
    console.error(err);
})

const initial = () => {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}


// const testRouter = require('./routes/test');
// const apikeyRouter = require('./routes/api_key_router');
// const apiRouter = require('./routes/user_routes');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by');
app.use(require('./middleware/cors').cors())


app.use('/v1', [
    require('./routes/user_routes'),
    require('./routes/media_routes')
])
// app.use('/test', testRouter);
// app.use('/auth', apikeyRouter);
// app.use('/api', apiRouter);

module.exports = app;
