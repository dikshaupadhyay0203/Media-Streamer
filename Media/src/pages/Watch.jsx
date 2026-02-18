import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import VideoCard from '../components/VideoCard'

export default function Watch() {

  const { id } = useParams();

  const [videoDetails, setVideoDetails] = useState(null);
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchVideoDetails();
  }, [id]);

  async function fetchVideoDetails() {
    try {

      const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

      // 🔹 CURRENT VIDEO DETAILS
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${API_KEY}`
      );

      const data = await response.json();

      if (data.items && data.items.length > 0) {
        setVideoDetails(data.items[0]);

        // 🔥 GET TITLE FOR SUGGESTIONS
        const title = data.items[0].snippet.title;

        fetchSuggestions(title);
      }

    } catch (error) {
      console.error('Error fetching video details:', error);
    } finally {
      setLoading(false);
    }
  }

  // 🔥 SUGGESTIONS FETCH
  async function fetchSuggestions(title) {

    try {
      const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

      const searchRes = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${title}&type=video&key=${API_KEY}`
      );

      const searchData = await searchRes.json();

      const videoIds = searchData.items
        .map(item => item.id.videoId)
        .join(",");

      const detailsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds}&key=${API_KEY}`
      );

      const detailsData = await detailsRes.json();

      setSuggestedVideos(detailsData.items);

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex gap-6 p-6 text-black dark:text-white max-w-7xl mx-auto">

      {/* LEFT SIDE VIDEO */}
      <div className="flex-1">

        <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${id}`}
            title="YouTube video player"
            allowFullScreen
          ></iframe>
        </div>

        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
          </div>
        ) : videoDetails ? (
          <div>
            <h1 className="text-xl font-semibold mb-2">
              {videoDetails.snippet.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
              <span>{parseInt(videoDetails.statistics.viewCount).toLocaleString()} views</span>
              <span>{parseInt(videoDetails.statistics.likeCount).toLocaleString()} likes</span>
            </div>

            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
              <div className="font-semibold mb-2">
                {videoDetails.snippet.channelTitle}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                {videoDetails.snippet.description}
              </p>
            </div>
          </div>
        ) : null}

      </div>

      {/* 🔥 RIGHT SIDE SUGGESTIONS */}
      <div className="w-[350px] flex flex-col gap-4 overflow-y-auto">

        {suggestedVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}

      </div>

    </div>
  );
}
