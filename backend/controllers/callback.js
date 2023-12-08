const { sendCallbackEmail } = require('../services/email');

exports.requestCallback = async(req, res) => {
    try {
        const { name, contactNumber, callbackTime, additionalComments } = req.body;

        // Send email notification
        sendCallbackEmail(name, contactNumber, callbackTime, additionalComments);

        res.status(200).json({ message: 'Callback request submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};