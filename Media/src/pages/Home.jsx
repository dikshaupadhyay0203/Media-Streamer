import { useEffect, useState } from "react";
import "./Home.css";

function Home() {

  const [videos, setVideos] = useState([]);

  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    const response = await fetch(
`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=IN&maxResults=12&key=${API_KEY}`
);


    const data = await response.json();
    setVideos(data.items);
  }

  return (
    <div className="home">

      {videos.map((video) => (
        <div className="video-card" key={video.id.videoId}>
          
          <img
            src={video.snippet.thumbnails.medium.url}
            alt="thumbnail"
          />

          <p>{video.snippet.title}</p>

        </div>
      ))}

    </div>
  );
}

export default Home;
