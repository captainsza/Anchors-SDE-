import React from "react";

const sendCallbackEmail = async(formData) => {
    const { name, contactNumber, callbackTime, additionalComments } = formData;

    try {
        // Send the callback email
        const response = await fetch("https://lionfish-app-dq839.ondigitalocean.app/api/send-callback-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                contactNumber,
                callbackTime, // Include callbackTime in the payload
                additionalComments,
            }),
        });

        if (response.ok) {
            console.log("Callback email sent successfully");
        } else {
            console.error("Failed to send callback email");
        }
    } catch (error) {
        console.error("An error occurred while sending the callback email:", error.message);
    }
};

export default sendCallbackEmail;