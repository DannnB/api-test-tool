// actions
const getMedia = (req, res, next) => {
    const TEST_DATA = [
        {
            "id": "opjaiafjwgj04t904g3n90rg0",
            "name": "Project One",
            "tagline": "The tagline of this item",
            "description": "A description goes here...",
            "tags": ["CSS", "HTML", "PHP", "WORDPRESS", "SEO"],
            "images": [{
                "url": "https://placehold.it/360?text=1",
                "description": "Description of image 1",
                "alt": "Alt 1"
            }]
        },
        {
            "id": "afwg4y354657rytegsw4yredr",
            "name": "Project Two",
            "tagline": "The tagline of this item",
            "description": "A description goes here...",
            "tags": ["JS", "PHP"],
            "images": [
                {
                    "url": "https://placehold.it/360?text=1",
                    "description": "Description of image 1",
                    "alt": "Alt 1"
                },
                {
                    "url": "https://placehold.it/360?text=2",
                    "description": "Description of image 2",
                    "alt": "Alt 2"
                }
            ]
        }
    ]

    res.json(TEST_DATA);
}

module.exports = {
    getMedia
}