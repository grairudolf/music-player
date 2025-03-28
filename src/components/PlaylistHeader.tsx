
import { Play, Heart, Clock, Search } from "lucide-react";
import { useState } from "react";

type PlaylistHeaderProps = {
  title: string;
  description: string;
  coverImage: string;
  songCount: number;
  duration: string;
  onSearch: (term: string) => void;
};

const PlaylistHeader = ({
  title,
  description,
  coverImage,
  songCount,
  duration,
  onSearch,
}: PlaylistHeaderProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 bg-gradient-to-b from-[#5038a1] to-spotify-darkgray p-6 rounded-t-lg">
        <div className="w-48 h-48 shadow-2xl">
          <img 
            src={coverImage} 
            alt={title} 
            className="w-full h-full object-cover" 
          />
        </div>
        
        <div className="flex flex-col text-white">
          <span className="text-xs font-semibold mb-2">PLAYLIST</span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-sm text-spotify-text mb-2">{description}</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold">Spotifake</span>
            <span>• {songCount} songs, {duration}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-[#121212] px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 rounded-b-lg">
        <div className="flex items-center gap-6">
          <button className="bg-spotify-green rounded-full p-3 hover:scale-105 transition-transform">
            <Play size={24} fill="black" />
          </button>
          
          <button 
            onClick={() => setIsLiked(!isLiked)} 
            className={`text-3xl ${isLiked ? 'text-spotify-green' : 'text-spotify-text'}`}
          >
            <Heart size={32} fill={isLiked ? "#1DB954" : "none"} />
          </button>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-spotify-text" />
          <input
            type="text"
            placeholder="Search in playlist"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full bg-[#2a2a2a] border border-transparent rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder:text-spotify-text focus:outline-none focus:border-white"
          />
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;
