const cors = require('cors')
var allowedOrigins = ['http://localhost:3000', 'app.codehubble.com']

module.exports.cors = () => {
    const corsOptions = {
        origin: function (origin, callback) {
            // allow requests with no origin
            // (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            console.log("Origin: ", origin)
            if (allowedOrigins.indexOf(origin) === -1 || !origin || origin == undefined) {
                const error = `The CORS policy for this site does not allow access from the specified Origin. Please contact an MMC official if you require legitimate access.`;
                //	return callback("error123", false)
                return callback(new Error(error), false);
            }
            return callback(null, true);
        },

        //  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
        //credentials: true,
        optionsSuccessStatus: 200
    }
    return cors(corsOptions)
}