// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "./Home.css";

// function Search() {

//   const { query } = useParams();
//   const [videos, setVideos] = useState([]);

//   const API_KEY = import.meta.env.VITE_RAPID_API_KEY;
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchSearchVideos();
//   }, [query]);

//   async function fetchSearchVideos() {

//     const response = await fetch(
//       `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&type=video&key=${API_KEY}`
//     );

//     const data = await response.json();
//     setVideos(data.items);
//   }

//   return (
//     <div className="home">

//       {videos.map((video) => (
//         <div
//           className="video-card"
//           key={video.id.videoId}
//           onClick={() => navigate(`/watch/${video.id.videoId}`)}
//         >
//           <img src={video.snippet.thumbnails.medium.url} />
//           <p>{video.snippet.title}</p>
//         </div>
//       ))}

//     </div>
//   );
// }

// export default Search;
