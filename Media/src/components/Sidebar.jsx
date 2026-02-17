import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <p><Link to="/">Home</Link></p>
      <p><Link to="/profile">Profile</Link></p>
      <p><Link to="/upload">Upload</Link></p>
      <p><Link to="/watch">Watch</Link></p>

    </div>
  );
}

export default Sidebar;
