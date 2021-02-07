require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");

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
}).catch(err => {
    console.error(err);
})

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
