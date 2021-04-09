const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./user.model');
db.roles = require('./role.model');

db.ROLES = ['user', 'editor', 'moderator', 'admin', 'superadmin'];

module.exports = db