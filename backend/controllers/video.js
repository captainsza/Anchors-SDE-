const axios = require('axios');
const Video = require('../models/Video');
require('dotenv').config({ path: '../config/config.env' });
exports.analyzeVideo = async(req, res) => {
    try {
        const { videoLink } = req.body;
        const videoId = extractVideoId(videoLink);
        const apiKey = process.env.APIKEY_YOUTUBE; // Replace with your actual YouTube API key

        const videoApiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${apiKey}`;
        const videoApiResponse = await axios.get(videoApiUrl);

        const channelId = videoApiResponse.data.items[0].snippet.channelId;
        const channelApiUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;
        const channelApiResponse = await axios.get(channelApiUrl);

        const snippet = videoApiResponse.data.items[0].snippet;
        const statistics = videoApiResponse.data.items[0].statistics;

        const subscriberCount = isNaN(channelApiResponse.data.items[0].statistics.subscriberCount) ? 0 : parseInt(channelApiResponse.data.items[0].statistics.subscriberCount);
        const views = isNaN(statistics.viewCount) ? 0 : parseInt(statistics.viewCount);
        const comments = isNaN(statistics.commentCount) ? 0 : parseInt(statistics.commentCount);
        const likes = isNaN(statistics.likeCount) ? 0 : parseInt(statistics.likeCount);

        const earnings = Math.min(subscriberCount, views) + 10 * comments + 5 * likes;
        const uploadDate = snippet.publishedAt;

        const video = new Video({
            link: videoLink,
            subscriberCount,
            views,
            comments,
            likes,
            thumbnail: snippet.thumbnails.default.url, // Use the desired thumbnail size (e.g., 'default', 'medium', 'high')
            name: snippet.title,
            uploadDate,
        });

        await video.save();

        res.status(200).json({ earnings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getAllVideos = async(req, res) => {
    try {
        const videos = await Video.find();
        res.status(200).json({ videos });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

function extractVideoId(link) {
    const match = link.match(/[?&]v=([^&]+)/);
    return match ? match[1] : null;
}