
import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player";
import TrackList from "@/components/TrackList";
import { Heart, Play, Search } from "lucide-react";
import { useState } from "react";

const LikedSongs = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    // In a real application, you would filter tracks based on the search term
    console.log("Searching for:", e.target.value);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto bg-spotify-darkgray">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 bg-gradient-to-b from-[#5038a1] to-spotify-darkgray p-6 rounded-t-lg">
            <div className="w-48 h-48 flex items-center justify-center bg-gradient-to-br from-[#450af5] to-[#8e8ee5] shadow-2xl">
              <Heart size={64} fill="white" className="text-white" />
            </div>
            
            <div className="flex flex-col text-white">
              <span className="text-xs font-semibold mb-2">PLAYLIST</span>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Liked Songs</h1>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold">Your Name</span>
                <span>• 34 songs</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[#121212] px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-b-lg">
            <div className="flex items-center gap-6">
              <button className="bg-spotify-green rounded-full p-3 hover:scale-105 transition-transform">
                <Play size={24} fill="black" />
              </button>
            </div>
            
            <div className="relative w-full md:w-64">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotify-text" />
              <input
                type="text"
                placeholder="Search in Liked Songs"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full bg-[#2a2a2a] border border-transparent rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder:text-spotify-text focus:outline-none focus:border-white"
              />
            </div>
          </div>
          
          <div className="px-6 py-4 pb-32">
            <TrackList />
          </div>
        </main>
      </div>
      
      <Player />
    </div>
  );
};

export default LikedSongs;
