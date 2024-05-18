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
    socket.on("chat message", (msg) => {
      console.log(msg);
      if (typeof msg === "object" && msg.text && msg.username) {
        setMessages((prevMessages) => [msg, ...prevMessages]);
      } else {
        console.log("Invalid message format received");
      }
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username) {
      console.log("Username is not defined");
      // Redirigez l'utilisateur vers la page de connexion ou d'inscription
      // Vous pouvez utiliser react-router pour cela
      // Par exemple : history.push('/login');
    } else {
      socket.emit("chat message", { text: message, username: username });
      setMessage("");
    }
  };

  return (
    <div className="chat">
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {typeof msg === "object" && msg.username && msg.text
              ? `${msg.username}: ${msg.text}`
              : "Invalid message format"}
          </li> // Affichez le pseudo et le message
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default Chat;
