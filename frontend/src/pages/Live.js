import React from "react";
// import { Link } from "react-router-dom";
import LiveVideo from "../components/LiveVideo";
import Chat from "../components/Chat";
import Navbar from "../components/Navbar";

const Live = () => {
  return (
    <div className="live">
      {/* <nav className="live-nav">
        <Link to="/">Accueil</Link>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Se déconnecter
        </button>
      </nav> */}
      <Navbar />
      <div className="live-content">
        <LiveVideo />
        <Chat />
      </div>
    </div>
  );
};

export default Live;
