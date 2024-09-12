import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation
import Modal from "./Modal";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Use useLocation to get the current location

  const isLivePage = location.pathname === "/live"; // Check if we are on the Live page

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const goToLive = () => {
    navigate("/live"); // Redirect to the live page
  };

  return (
    <nav className="navbar">
      {isLivePage ? (
        <>
          <Link to="/">Accueil</Link>
        </>
      ) : !isLoggedIn ? (
        <>
          <button onClick={() => openModal("register")}>S'inscrire</button>
          <button onClick={() => openModal("login")}>Se connecter</button>
        </>
      ) : (
        <>
          <button onClick={handleLogout}>Se déconnecter</button>
          <button onClick={goToLive}>Live</button>
        </>
      )}
      {showModal && <Modal type={modalType} closeModal={closeModal} />}
    </nav>
  );
};

export default Navbar;
