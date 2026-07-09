
import { useState, useEffect } from "react";
import { YOUTUBE_VIDEO_API } from "../utils/constant";
import VideoCard from "./VideoCard";
import { Link } from "react-router";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  

  useEffect(() => {
    getVideos(); 
  }, []);

  const getVideos = async () => {
    try {
      const response = await fetch(`${YOUTUBE_VIDEO_API}`);
      const data = await response.json();
      setVideos(data.items); 
    }
     catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

 

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9 p-5 mx-auto">
      {videos?.map((video) => (
        <Link to={"/watch?v=" + video.id} key={video?.id}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
