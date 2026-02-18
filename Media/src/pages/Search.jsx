import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VideoCard from "../components/VideoCard";

export default function Search() {

  const [videos, setVideos] = useState([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (!query) return;
    fetchSearchVideos();
  }, [query]);

  async function fetchSearchVideos() {

    try {
      const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

      console.log("Searching for:", query);   // 🔥 DEBUG

      const searchRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=12&q=${query}&type=video&key=${API_KEY}`
      );

      const searchData = await searchRes.json();

      const videoIds = searchData.items
        .map(item => item.id.videoId)
        .join(",");

      const videoRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${API_KEY}`
      );

      const videoData = await videoRes.json();
      setVideos(videoData.items || []);

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="p-6 text-black dark:text-white">

      <h2 className="text-xl font-semibold mb-4">
        Search Results for "{query}"
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

    </div>
  );
}
