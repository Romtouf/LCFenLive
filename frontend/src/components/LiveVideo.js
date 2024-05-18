import React from "react";

const LiveVideo = ({ videoUrl }) => {
  return (
    <div className="live-video">
      <iframe
        width="100%"
        height="100%"
        src={videoUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Live Video"
      ></iframe>
    </div>
  );
};

export default LiveVideo;
