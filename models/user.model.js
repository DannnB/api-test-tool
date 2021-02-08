const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: { type: String, required: true },
        email: { type: String, required: true },
        hash: { type: String, required: true },
        firstName: { type: String },
        lastName: { type: String },
        bio: { type: String },
        location: { type: String },
        company: { type: String },
        avatar: { type: String },
        website: [
            {
                url: String
            }
        ],
        social: [
            {
                url: String
            }
        ],
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    })
);

module.exports = User;