const mongoose = require('mongoose');

const Media = mongoose.model(
    'Media',
    new mongoose.Schema({
        uuid: { type: String, required: true },
        name: { type: String, required: true },
        tagline: String,
        description: String,
        tags: [
            {
                tag_name: String
            }
        ],
        images: [
            {
                uuid: { type: String, required: true },
                url: { type: String, required: true },
                description: String,
                alt: String
            }
        ],
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }
    })
);

module.exports = User;