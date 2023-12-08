
import React from "react";
import { default as ModalProvider } from "react-modal";
import { Button, Img, Text } from "components";

const RequestedCallBackModal = ({ isOpen, onRequestClose, ...props }) => {
  return (
    <ModalProvider
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      appElement={document.getElementById("root")}
      className="m-auto !w-[36%]"
      overlayClassName="bg-white-A700_33 fixed flex h-full inset-y-[0] w-full"
      {...props}
    >
      <div className="max-h-[97vh] overflow-y-auto sm:w-full md:w-full">
        <div className="bg-gray-900_02 flex flex-col gap-5 h-[396px] md:h-auto items-center justify-center p-10 md:px-5 rounded-[10px] w-[480px] sm:w-full">
          <Img
            className="h-20 w-20"
            src="images/img_mditickcircleoutline.svg"
            alt="mditickcircleou"
          />
          <div className="flex flex-col gap-7 items-center justify-start w-auto">
            <div className="flex flex-col gap-5 items-center justify-start w-auto">
              <div className="flex flex-col items-center justify-start w-auto">
                <Text
                  className="text-2xl md:text-[22px] text-center text-white-A700 sm:text-xl w-auto"
                  size="txtInterMedium24"
                >
                  Request a call back{" "}
                </Text>
              </div>
              <div className="flex flex-col gap-2 items-center justify-start w-auto">
                <Text
                  className="leading-[20.00px] text-base text-center text-white-A700_cc"
                  size="txtInterRegular16WhiteA700cc"
                >
                  <>
                    Our Team will call you shortly in <br />
                    12-24 hrs
                  </>
                </Text>
                <Text
                  className="text-base text-center text-white-A700_cc w-auto"
                  size="txtInterRegular16WhiteA700cc"
                >
                  Can’t you wait for a call?
                </Text>
              </div>
            </div>
            <Button
              className="cursor-pointer flex items-center justify-center min-w-[305px] rounded-[24px]"
              rightIcon={
                <Img
                  className="h-6 ml-1 my-px"
                  src="images/img_arrowleft.svg"
                  alt="arrow_left"
                />
              }
              shape="round"
              color="red_A700"
              variant="fill"
              onClick={onRequestClose}
            >
              <div className="leading-[normal] text-left text-xl">
                Check another video
              </div>
            </Button>
          </div>
        </div>
      </div>
    </ModalProvider>
  );
};

export default RequestedCallBackModal;
