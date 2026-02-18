import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiSun, FiMoon, FiMenu } from 'react-icons/fi'
import { BiVideoPlus } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'

export default function Navbar({ toggleSidebar }) {

  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const navigate = useNavigate();

  // 🔥 DARK MODE
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // 🔥 FETCH SUGGESTIONS (DEBOUNCE)
  useEffect(() => {

    if (!searchQuery) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(timer);

  }, [searchQuery]);

  async function fetchSuggestions() {
    try {
      const res = await fetch(
        `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${searchQuery}`
      );

      const data = await res.json();
      setSuggestions(data[1]);

    } catch (err) {
      console.log(err);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (s) => {
    setSearchQuery(s);
    navigate(`/search?q=${s}`);
    setShowSuggestions(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 z-50 transition-colors">

      {/* LEFT */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
        >
          <FiMenu className="w-6 h-6 text-black dark:text-white" />
        </button>

        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <span className="text-xl font-semibold text-black dark:text-white">Streamix</span>
        </Link>
      </div>

      {/* 🔥 CENTER SEARCH WITH SUGGESTIONS */}
      <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4 relative">

        <div className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="Search"
            className="w-full h-10 px-4 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-l-full text-black dark:text-white focus:outline-none"
          />

          <button
            type="submit"
            className="h-10 px-6 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 border-l-0 rounded-r-full"
          >
            <FiSearch className="w-5 h-5 text-black dark:text-white" />
          </button>
        </div>

        {/* 🔥 SUGGESTION BOX */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-12 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg rounded-lg z-50">
            {suggestions.map((s, index) => (
              <p
                key={index}
                className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => handleSuggestionClick(s)}
              >
                {s}
              </p>
            ))}
          </div>
        )}

      </form>

      {/* RIGHT */}
      <div className="flex items-center gap-2">
        <Link to="/upload" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
          <BiVideoPlus className="w-6 h-6 text-black dark:text-white" />
        </Link>

        <Link to="/profile" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
          <FaUser className="w-6 h-6 text-black dark:text-white" />
        </Link>

        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
        >
          {isDarkMode ? (
            <FiSun className="w-6 h-6 text-black dark:text-white" />
          ) : (
            <FiMoon className="w-6 h-6 text-black dark:text-white" />
          )}
        </button>
      </div>

    </nav>
  );
}
