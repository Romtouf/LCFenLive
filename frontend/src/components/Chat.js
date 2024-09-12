import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000", { withCredentials: true });

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username] = useState(localStorage.getItem("username") || "");

  useEffect(() => {
    // Récupérer les messages précédents
    socket.on("previous_messages", (msgs) => {
      setMessages(msgs.reverse());
    });

    // Écouter les nouveaux messages
    socket.on("chat_message", (msg) => {
      console.log(msg);
      if (typeof msg === "object" && msg.text && msg.username) {
        setMessages((prevMessages) => [msg, ...prevMessages]);
      } else {
        console.log("Invalid message format received");
      }
    });

    // Demander les messages précédents lors de la connexion
    socket.emit("request_previous_messages");

    return () => {
      socket.off("previous_messages");
      socket.off("chat_message");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      alert("Veuillez entrer un pseudo avant d'envoyer des messages.");
      return;
    }
    socket.emit("chat_message", { text: message, username: username });
    setMessage("");
  };

  return (
    <div className="chat">
      <form onSubmit={handleSubmit} className="chat-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tapez votre message ici"
        />
        <button type="submit">Envoyer</button>
      </form>
      <ul>
        <div id="message-container">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message ${index % 2 === 0 ? "white-background" : ""}`}
            >
              {typeof msg === "object" && msg.username && msg.text ? (
                <>
                  <strong>{msg.username}: </strong>
                  {msg.text}
                </>
              ) : (
                "Invalid message format"
              )}
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default Chat;
