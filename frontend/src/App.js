import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Live from "./pages/Live";
import Footer from "./components/Footer";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/"; // Redirection après déconnexion
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}
        />
        <Route
          path="/live"
          element={isLoggedIn ? <Live /> : <Navigate to="/" />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
