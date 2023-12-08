const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const videoRoutes = require('./routes/video');
require('dotenv').config({ path: './config/config.env' });
const callbackRoutes = require('./routes/callback');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/videos', videoRoutes);
app.use('/api/callback', callbackRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});