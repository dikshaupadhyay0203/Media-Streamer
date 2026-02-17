import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />

      <div className="main-container">
        <Sidebar />

        <div className="content">
          {children}
        </div>

      </div>
    </div>
  );
}

export default Layout;
