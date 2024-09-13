import React, { useState } from "react";
// import "./VideoLoader.css"; // For styling the loader and video

const VideoLoader = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Handle the event when video has finished loading
  const handleVideoLoaded = () => {
    setIsLoading(false);
  };

  return (
    <div className="video-container py-20">
      {isLoading && <div className="loader">Loading...</div>}
      <video
        onLoadedData={handleVideoLoaded}
        width="100%"
        controls
        autoPlay={true}
        loop={true}
      >
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoLoader;
