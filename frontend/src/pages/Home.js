import React from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";

const Home = ({ isLoggedIn, handleLogout }) => {
  return (
    <>
      <Loader />
      <div className="home">
        <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <h1>Bienvenue au Lisieux Club Futsal</h1>
      </div>
    </>
  );
};

export default Home;
