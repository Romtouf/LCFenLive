import React, { useState } from "react";
import axios from "axios";

const Modal = ({ type, closeModal }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (type === "register") {
        await axios.post("http://localhost:5000/api/auth/register", formData);
      } else if (type === "login") {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            username: formData.username,
            password: formData.password,
          }
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", formData.username);
        window.location.href = "/live"; // Redirection vers la page Live
      }
      closeModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="modal" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{type === "register" ? "S'inscrire" : "Se connecter"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          {type === "register" && (
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;