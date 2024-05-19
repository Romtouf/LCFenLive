import React from "react";
import Navbar from "../components/Navbar";
import banniere from "../assets/banniere.webp";

const Home = ({ isLoggedIn, handleLogout }) => {
  return (
    <>
      <div className="home">
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <h1>Lisieux Club Futsal en live</h1>
        <img src={banniere} alt="Bannière" />
      </div>
    </>
  );
};

export default Home;
