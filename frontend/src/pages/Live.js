import React from "react";
import { Link } from "react-router-dom";
import LiveVideo from "../components/LiveVideo";
import Chat from "../components/Chat";

const Live = () => {
  const videoUrl = process.env.REACT_APP_VIDEO_URL;
  console.log("Video URL:", videoUrl);

  return (
    <div className="live">
      <nav className="live-nav">
        <Link to="/">Accueil</Link>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Se déconnecter
        </button>
      </nav>
      <div className="live-content">
        <LiveVideo videoUrl={videoUrl} />
        <Chat />
      </div>
    </div>
  );
};

export default Live;
