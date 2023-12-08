const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    link: { type: String, required: true },
    subscriberCount: { type: Number, required: true },
    views: { type: Number, required: true },
    comments: { type: Number, required: true },
    likes: { type: Number, required: true },
    thumbnail: { type: String },
    name: { type: String },
    uploadDate: { type: Date },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;