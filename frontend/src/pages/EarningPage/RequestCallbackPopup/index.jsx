import React, { useState } from "react";
import Modal from "react-modal";
import { Button, Input, Text } from "components";

const RequestCallbackPopupModal = (props) => {
  console.log('Modal props:', props);
  const [formData, setFormData] = useState({
    name: "",
    mobilenumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://lionfish-app-dq839.ondigitalocean.app/api/send-callback-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {

        console.log("Callback email sent successfully");
      } else {

        console.error("Failed to send callback email");
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <Modal
    isOpen={props.isOpen}
    onRequestClose={props.onRequestClose}
    appElement={document.getElementById("root")}
    className="modal-content"
    overlayClassName="modal-overlay"
    style={{ content: { height: '50%', width: '50%' } }}
  >
      <div className="modal-body">
        <div className="max-h-[97vh] overflow-y-auto sm:w-full md:w-full">
          <div className="bg-gray-900_02 flex flex-col h-[396px] md:h-auto items-center justify-center p-10 md:px-5 rounded-[10px] w-[480px] sm:w-full">
            <div className="flex flex-col gap-10 items-center justify-center w-auto">
              <div className="flex flex-col items-center justify-start w-auto">
                <Text
                  className="text-2xl md:text-[22px] text-center text-white-A700 sm:text-xl w-auto"
                  size="txtInterMedium24"
                >
                  Request a call back{" "}
                </Text>
              </div>
              <div className="flex flex-col gap-7 items-center justify-center w-auto">
                <div className="flex flex-col gap-4 items-start justify-start w-auto sm:w-full">
                  <Input
                    name="name"
                    placeholder="Enter Name"
                    className="leading-[normal] p-0 placeholder:text-gray-600 text-left text-xl w-full"
                    wrapClassName="w-full"
                    type="text"
                    shape="round"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <Input
                    name="mobilenumber"
                    placeholder="Mobile number"
                    className="leading-[normal] p-0 placeholder:text-gray-600 text-left text-xl w-full"
                    wrapClassName="w-full"
                    type="number"
                    shape="round"
                    value={formData.mobilenumber}
                    onChange={handleInputChange}
                  />
                </div>
                <Button
                  className="cursor-pointer leading-[normal] min-w-[268px] rounded-[24px] text-center text-xl"
                  shape="round"
                  color="white_A700"
                  variant="fill"
                  onClick={handleSubmit}
                >
                  Request a Call Back
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default RequestCallbackPopupModal;
