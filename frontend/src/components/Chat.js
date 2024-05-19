import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  ); // Ajoutez un état pour le pseudo de l'utilisateur

  useEffect(() => {
    // Récupérez les messages depuis la base de données
    socket.on("chat_message", (msg) => {
      console.log(msg);
      if (typeof msg === "object" && msg.text && msg.username) {
        setMessages((prevMessages) => [msg, ...prevMessages]);
      } else {
        console.log("Invalid message format received");
      }
    });

    return () => {
      socket.off("chat_message");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      console.log("Username is not defined");
      // Redirigez l'utilisateur vers la page de connexion ou d'inscription
    }
    socket.emit("chat_message", { text: message, username: username });
    setMessage("");
  };

  return (
    <div className="chat">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écris ton message ici"
        />
        <button type="submit">Envoyer</button>
      </form>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {typeof msg === "object" && msg.username && msg.text
              ? `${msg.username}: ${msg.text}`
              : "Invalid message format"}
          </li> // Affichez le pseudo et le message
        ))}
      </ul>
    </div>
  );
};

export default Chat;
