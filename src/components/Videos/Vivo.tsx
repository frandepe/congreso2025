import React from "react";
import YouTube from "react-youtube";

const LiveVideo = () => {
  const videoId = "pvYJhY4qQY0";
  //   const videoId = "I02-AQLPm7I";

  const opts = {
    width: "100%",
    height: "500",
    playerVars: {
      autoplay: 1,
      playsinline: 1,
    },
  };

  return (
    <div className="flex justify-center items-center flex-col" id="live">
      <h2 className="text-2xl font-semibold mb-4 text-center mt-20">
        Transmisión en vivo
      </h2>
      <div className="w-full max-w-4xl aspect-video">
        <YouTube videoId={videoId} opts={opts} />
      </div>
    </div>
  );
};

export default LiveVideo;
