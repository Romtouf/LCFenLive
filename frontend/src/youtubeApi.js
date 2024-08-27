const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.REACT_APP_CHANNEL_ID;

export const getLiveVideoId = async () => {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&eventType=live&type=video&key=${API_KEY}`;

  try {
    console.log("Fetching live video with URL:", url);
    const response = await fetch(url);

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `Error! status: ${response.status}, message: ${errorDetails.error.message}`
      );
    }

    const data = await response.json();
    console.log("API Response: ", data);

    if (data.items && data.items.length > 0) {
      return data.items[0].id.videoId;
    } else {
      console.warn("No live video found. API Response: ", data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching live video: ", error);
    return null;
  }
};
