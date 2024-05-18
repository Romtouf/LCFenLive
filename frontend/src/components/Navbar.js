import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <nav className="navbar">
      <Link to="/">Accueil</Link>
      {!isLoggedIn ? (
        <>
          <button onClick={() => openModal("register")}>S'inscrire</button>
          <button onClick={() => openModal("login")}>Se connecter</button>
        </>
      ) : (
        <button onClick={handleLogout}>Se déconnecter</button>
      )}
      {showModal && <Modal type={modalType} closeModal={closeModal} />}
    </nav>
  );
};

export default Navbar;
