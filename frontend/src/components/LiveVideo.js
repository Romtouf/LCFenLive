import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { getLiveVideoId } from "../youtubeApi";

const LiveVideo = () => {
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let intervalId;

    const fetchLiveVideo = async () => {
      try {
        const id = await getLiveVideoId();
        if (id) {
          setVideoId(id);
          setLoading(false);
          if (intervalId) clearInterval(intervalId); // Stop further checks
        } else {
          setVideoId(null);
          setLoading(false);
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    // Fetch live video on mount
    fetchLiveVideo();

    // Set interval to fetch live video every minute if no live video was found
    intervalId = setInterval(fetchLiveVideo, 60000);

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  if (!videoId) {
    return <div>Pas de direct pour le moment...</div>;
  }

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
};

export default LiveVideo;
