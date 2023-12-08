import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button, Img, List, Text } from "components";
import RequestCallbackPopupModal from "./RequestCallbackPopup/index"; 
import RequestedCallBackModal from "./RequestedCallBack/index"; 
const EarningPagePage = () => {
  const [topVideo, setTopVideo] = useState(null);
  const [otherVideos, setOtherVideos] = useState([]);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isRequestedModalOpen, setIsRequestedModalOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allVideosResponse = await fetch("https://lionfish-app-dq839.ondigitalocean.app/api/videos/all");
        const allVideosData = await allVideosResponse.json();
        const sortedVideos = allVideosData.videos.slice().sort((a, b) => {
          const earningsA = calculateEarnings(a);
          const earningsB = calculateEarnings(b);
          return earningsB - earningsA;
        });
        setTopVideo({
          ...sortedVideos[0],
          earnings: calculateEarnings(sortedVideos[0]),
        });
        setOtherVideos(
          sortedVideos.slice(1).map((video) => ({
            ...video,
            earnings: calculateEarnings(video),
          }))
        );
      } catch (error) {
        console.error("An error occurred:", error.message);
      }
    };
  
    fetchData();
  }, []);
  const calculateEarnings = (video) => {
    return video.views * 0.01 + video.likes * 0.02 + video.comments * 0.03;
  };

  const openRequestModal = () => {
    console.log('Button clicked',isRequestModalOpen);
    setIsRequestModalOpen(true);
};

  const closeRequestModal = () => {
    setIsRequestModalOpen(false);
  };

  const openRequestedModal = () => {
    setIsRequestedModalOpen(true);
  };

  const closeRequestedModal = () => {
    setIsRequestedModalOpen(false);
  };

  const handleRequestCallback = async (requestData) => {
    try {
      const response = await fetch("https://lionfish-app-dq839.ondigitalocean.app/api/callback/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (data.message === "Callback request submitted successfully") {
        closeRequestModal();
        openRequestedModal();
      } else {
        console.error("Error submitting callback request");
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };
  
  return (
    <>
    <div className="bg-black-900 flex flex-col font-inter items-center justify-start mx-auto pb-4 w-full">
      <header className="bg-black-900 flex sm:flex-col md:gap-10 items-center justify-between px-36 md:px-5 py-4 w-full">
        <div className="flex md:flex-1 flex-row items-start justify-center w-[19%] md:w-full">
          <Img
            className="h-[22px] md:h-auto mt-[7px] object-cover w-[22px]"
            src="images/img_image2.png"
            alt="imageTwo"
          />
          <Text
            className="ml-3.5 sm:text-2xl md:text-[26px] text-[28px] text-white-A700"
            size="txtSoraSemiBold28"
          >
            anchors
          </Text>
          <Text
            className="bg-blue_gray-100 justify-center mb-[19px] ml-2.5 px-1.5 rounded text-[10px] text-gray-900 w-auto"
            size="txtInterRegular10"
          >
            Beta
          </Text>
        </div>
        <div className="flex flex-col items-start justify-start w-auto">

          <Button
            className="cursor-pointer flex items-center justify-center min-w-[260px]"
            leftIcon={
              <Img
                className="h-5 mt-px mb-1 mr-2"
                src="images/img_call.svg"
                alt="call"
              />
            }
            shape="round"
            onClick={openRequestModal}
          >
            <div className="text-left text-xl">Request a call back</div>
          </Button>
        </div>
      </header>
        
        <div className="bg-black-900 flex flex-col items-center justify-start p-[46px] md:px-10 sm:px-5 w-full">
          <div className="bg-gray-900_01 flex flex-col items-center justify-start max-w-[1079px] mx-auto px-10 md:px-5 py-5 rounded-[16px] w-full">
            <div className="flex md:flex-col flex-row gap-10 items-center justify-start w-auto">
              <div className="flex sm:flex-col flex-row gap-5 items-center justify-start w-auto sm:w-full">
   
                <div className="flex flex-col gap-5 items-start justify-start w-[254px]">
                  <Button
                    className="cursor-pointer flex items-center justify-center min-w-[172px] rounded"
                    leftIcon={
                      <Img
                        className="h-6 mr-1"
                        src="images/img_mdiprize.svg"
                        alt="mdi:prize"
                      />
                    }
                    color="gray_600"
                    size="xs"
                    variant="fill"
                  >
                    <div className="text-base text-left">Top earner video</div>
                  </Button>
                  <Img
                    className="h-[135px] md:h-auto object-cover rounded-[10px] w-60 sm:w-full"
                    src={topVideo?.thumbnail}
                    alt="frameSeven"
                  />
                  <Text
                    className="text-base text-white-A700_7f w-auto"
                    size="txtInterRegular16"
                  >
                    Uploaded on - {new Date(topVideo?.uploadDate).toLocaleDateString()}

                  </Text>
                </div>

                <div className="flex flex-col gap-[11px] items-start justify-start w-[255px]">
                  <Text
                    className="max-w-[255px] md:max-w-full text-white-A700 text-xl"
                    size="txtInterMedium20"
                  >
                    {topVideo?.name}
                  </Text>
                  <div className="flex flex-col gap-3 items-start justify-start w-auto">
                    <div className="flex flex-row gap-2 items-center justify-start w-auto">
                      <Img
                        className="h-6 w-6"
                        src="images/img_mdieye.svg"
                        alt="mdieye"
                      />
                      <Text
                        className="text-base text-white-A700_7f w-auto"
                        size="txtInterRegular16"
                      >
                        {topVideo?.views}
                      </Text>
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-start w-auto">
                      <Img
                        className="h-6 w-6"
                        src="images/img_materialsymbolsthumbup.svg"
                        alt="materialsymbols"
                      />
                      <Text
                        className="text-base text-white-A700_7f w-auto"
                        size="txtInterRegular16"
                      >
                        {topVideo?.likes}
                      </Text>
                    </div>
                    <div className="flex flex-row gap-2 items-center justify-start w-auto">
                      <Img
                        className="h-6 w-6"
                        src="images/img_mdicomment.svg"
                        alt="mdicomment"
                      />
                      <Text
                        className="text-base text-white-A700_7f w-auto"
                        size="txtInterRegular16"
                      >
                        {topVideo?.comments}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estimated Earnings */}
              <div className="bg-gray-900_02 flex flex-col items-start justify-start px-5 py-10 rounded-[16px] w-auto sm:w-full">
                <div className="flex flex-col gap-6 items-center justify-start w-[346px]">
                  <div className="flex flex-row items-center justify-start w-auto">
                    <Img
                      className="h-10 w-10"
                      src="images/img_rupee.svg"
                      alt="rupee"
                    />
                    <Text
                      className="sm:text-4xl md:text-[38px] text-[40px] text-white-A700 w-auto"
                      size="txtInterBold40"
                    >
                      {Math.floor(topVideo?.earnings)}
                    </Text>
                  </div>
                  <div className="bg-white-A700 h-12 rounded-[24px] w-[42%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Text
          className="mt-[21px] text-white-A700_b2 text-xl"
          size="txtInterMedium20WhiteA700b2"
        >
          Other Videos Potentials
        </Text>
        <List
  className="flex flex-col gap-1 items-center max-w-[1079px] mt-[21px] mx-auto md:px-5 w-full"
  orientation="vertical"
>
  <div className="bg-gray-900_01 flex flex-1 sm:flex-col flex-row sm:gap-5 items-center justify-start p-[29px] sm:px-5 w-full">
  {['#', 'Title', 'Thumbnail', 'Views', 'Likes', 'Comments', 'Uploaded Date', 'Estimated Earning'].map((header) => (
    <Text className={`w-1/12 text-base text-white-A700 ${header === 'Comments' || header === 'Uploaded Date' || header === 'Estimated Earning' ? 'mr-8' : 'mr-2'}`} size="txtInterBold16">
      {header}
    </Text>
  ))}
</div>
  {otherVideos.map((video, index) => (
    <div key={video._id} className={`bg-gray-900_01 flex flex-1 sm:flex-col flex-row sm:gap-5 items-center justify-start p-[29px] sm:px-5 w-full`}>
      {[index + 2, video.name, video.thumbnail, video.views, video.likes, video.comments, new Date(video.uploadDate).toLocaleDateString(), Math.min(video.subscriberCount, video.views) + 10 * video.comments + 5 * video.likes].map((value, i) => {
        if (i === 2) {
          return (
            <Img
              className="flex-1 h-[67px] md:h-auto sm:mt-0 mt-[7px] object-cover rounded-[10px]"
              src={value}
              alt={video.title}
            />
          );
        } else {
          return (
            <Text
              className="flex-1 text-base text-white-A700"
              size={i === 0 || i === 1 ? "txtInterBold16" : "txtInterRegular16WhiteA700cc"}
            >
              {value}
            </Text>
          );
        }
      })}
    </div>
  ))}
</List>

      </div>
      <RequestCallbackPopupModal
        isOpen={isRequestModalOpen}
        onRequestClose={closeRequestModal}
        onRequestCallback={handleRequestCallback}
      />
      <RequestedCallBackModal
        isOpen={isRequestedModalOpen}
        onRequestClose={closeRequestedModal}
      />
    </>
  );
};

export default EarningPagePage;