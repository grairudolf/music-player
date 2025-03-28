
import { Home, Search, Library, PlusSquare, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex flex-col h-full bg-black text-spotify-text w-56 shrink-0">
      <div className="p-6">
        <h1 className="text-white text-2xl font-bold mb-6">Spotifake</h1>
        
        <nav className="space-y-6">
          <div className="space-y-2">
            <Link to="/" className="flex items-center gap-3 text-white hover:text-spotify-green transition duration-200">
              <Home size={24} />
              <span className="font-semibold">Home</span>
            </Link>
            <Link to="/search" className="flex items-center gap-3 hover:text-white transition duration-200">
              <Search size={24} />
              <span className="font-semibold">Search</span>
            </Link>
            <Link to="/library" className="flex items-center gap-3 hover:text-white transition duration-200">
              <Library size={24} />
              <span className="font-semibold">Your Library</span>
            </Link>
          </div>
          
          <div className="space-y-2 pt-4 border-t border-spotify-lightgray">
            <button className="flex items-center gap-3 hover:text-white transition duration-200 w-full text-left">
              <PlusSquare size={24} />
              <span className="font-semibold">Create Playlist</span>
            </button>
            <Link to="/liked-songs" className="flex items-center gap-3 hover:text-white transition duration-200">
              <Heart size={24} />
              <span className="font-semibold">Liked Songs</span>
            </Link>
          </div>
        </nav>
      </div>
      
      <div className="mt-auto p-6 space-y-2">
        <div className="text-xs text-spotify-text hover:underline cursor-pointer">Cookies</div>
        <div className="text-xs text-spotify-text hover:underline cursor-pointer">Privacy</div>
      </div>
    </div>
  );
};

export default Sidebar;
