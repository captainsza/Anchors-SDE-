const nodemailer = require('nodemailer');
require('dotenv').config({ path: '../config/config.env' });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    },
});

exports.sendCallbackEmail = async(name, contactNumber, callbackTime, additionalComments) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "captainempire786@gmail.com",
            subject: 'Callback Request',
            text: `
                Name: ${name || 'N/A'}
                Contact Number: ${contactNumber}
                Preferred Callback Time: ${callbackTime || 'N/A'}
                Additional Comments/Questions: ${additionalComments || 'N/A'}
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);

        return { success: true, message: 'Callback request submitted successfully' };
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error sending callback request email' };
    }
};