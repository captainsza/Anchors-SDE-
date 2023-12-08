import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button , Img, Text } from "components";
import LinearProgress from '@material-ui/core/LinearProgress';


const LandingpagePage = () => {
  const navigate = useNavigate();
  const [videoLink, setVideoLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const handleInputChange = (event) => {
    setVideoLink(event.target.value);
  };

  const handleAnalyzeClick = async () => {
    if (!videoLink) {
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch("https://lionfish-app-dq839.ondigitalocean.app/api/videos/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoLink }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        navigate("/earningpage", {
          state: {
            videoDetails: {
              videoLink,
              earnings: data.earnings,
            },
          },
        });
      } else {
        console.error("API error:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    } finally {
      setLoading(false);
      setProgress(0); 
    }
  };

  const variants = {
    outline: {
      white_A700_7f: "border border-solid border-white-A700_7f text-blue_gray-900",
      gray_600: "border border-gray-600 border-solid text-gray-600",
    },
  };
  const shapes = { round: "rounded-[10px]" };
  const sizes = { xs: "pb-[9px] pt-3 px-[150px]", sm: "pl-3.5 pr-3 py-3.5" };

  const Input = ({ placeholder, value, onChange, className, wrapClassName, prefix, color, size }) => (
    <div className={`relative ${wrapClassName}`}>
    {prefix && <div className="absolute inset-y-0 left-0 flex items-center pl-3">{prefix}</div>}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`outline-none w-full ${sizes[size]} ${variants.outline[color]} ${shapes.round} ${className}`}
      />
    </div>
  );


  return (
    <>
      <div className="bg-black-900 flex flex-col font-inter gap-[46px] items-end justify-start mx-auto w-full">
        <div className="flex flex-col gap-[58px] items-center w-full">
          <div className="bg-black-900 flex flex-col items-center justify-between max-w-[1367px] md:px-10 px-36 sm:px-5 py-4 w-full">
            <div className="flex flex-row items-start justify-start w-[19%]">
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
          </div>
          <div className="flex flex-col md:gap-10 gap-[60px] items-start justify-start md:px-5 w-auto md:w-full">
            <div className="flex flex-col gap-6 items-center justify-start max-w-[741px] w-full">
              <Text
                className="leading-[72.00px] max-w-[741px] md:max-w-full sm:text-[40px] md:text-[46px] text-[50px] text-center text-white-A700"
                size="txtInterBold50"
              >
                Discover your earning potential
              </Text>
              <Text
                className="leading-[36.00px] text-2xl md:text-[22px] text-center text-white-A700_cc sm:text-xl"
                size="txtInterRegular24"
              >
                <>
                  Turn your Youtube expertise into a lucrative income
                  <br />
                  through resource sharing
                </>
              </Text>
            </div>
            <div className="flex sm:flex-col flex-row gap-5 items-center justify-start max-w-[713px] w-full">
          <Input
            placeholder="Enter Youtube Video Link"
            value={videoLink}
            onChange={handleInputChange}
            className="additional-custom-styles"
            wrapClassName="additional-wrap-styles"
            prefix={<img className="mt-auto mb-0.5 h-6 mr-2.5" src="images/img_mdiyoutube.svg" alt="mdi:youtube" />}
            color="white_A700_7f"
            size="xs"
          />
           <Button
      onClick={handleAnalyzeClick}
      className={`bg-red-A400 h-12 rounded-[50px] w-[23%] ${loading ? 'cursor-not-allowed' : ''}`}
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <LinearProgress
            variant="determinate"
            value={progress}
            style={{ width: '100%', height: '4px' }}
          />
        </div>
      ) : (
        "Analyze"
      )}
    </Button>
        </div>
          </div>
        </div>
        <div className="bg-white-A700_0f flex flex-col items-end justify-end p-[50px] md:px-5 rounded-[120px] w-1/5 md:w-full">
          <Img
            className="h-20 mr-5 mt-[60px] w-20"
            src="images/img_solarplaybold.svg"
            alt="solarplaybold"
          />
        </div>
      </div>
    </>
  );
};

export default LandingpagePage;
