import React, { useEffect, useState } from "react";

const Loader = () => {
  const [showLoader, setShowLoader] = useState(true);
  const [text, setText] = useState("");
  const loadingText = "L'Histoire s'écrit ici...\nLisieux Club Futsal";
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= loadingText.length) {
        setText(loadingText.substring(0, index));
        index++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setShowLoader(false);
        }, 3000); // Temps supplémentaire pour l'animation
      }
    }, 100); // Délai entre chaque lettre (100ms)

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`loader-container ${showLoader ? "show" : "hide"}`}>
      <div className="loading-text">{text}</div>
    </div>
  );
};

export default Loader;
