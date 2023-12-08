import axios from 'axios';
const API_BASE_URL = 'https://lionfish-app-dq839.ondigitalocean.app/api';
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const analyzeVideo = async(videoLink) => {
    try {
        const response = await api.post('/videos/analyze', { videoLink });
        return response.data;
    } catch (error) {
        console.error('Error analyzing video:', error);
        throw error;
    }
};