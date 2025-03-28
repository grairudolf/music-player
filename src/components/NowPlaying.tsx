
import { Play, Heart, ThreeDots } from "lucide-react";
import { useState } from "react";

const NowPlaying = () => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-gradient-to-b from-[#5038a1] to-spotify-darkgray p-8 rounded-lg">
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
        <div className="w-48 h-48 md:w-56 md:h-56 shadow-2xl">
          <img 
            src="https://via.placeholder.com/300" 
            alt="Current Album" 
            className="w-full h-full object-cover" 
          />
        </div>
        
        <div className="flex flex-col text-white">
          <span className="text-xs font-semibold mb-2">ALBUM</span>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">A Night at the Opera</h1>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img 
                src="https://via.placeholder.com/30" 
                alt="Artist Profile" 
                className="w-full h-full object-cover" 
              />
            </div>
            <span className="font-semibold">Queen</span>
            <span className="text-xs">• 1975 • 12 songs, 43 min 31 sec</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex items-center gap-6">
        <button className="bg-spotify-green rounded-full p-3 hover:scale-105 transition-transform">
          <Play size={24} fill="black" />
        </button>
        
        <button 
          onClick={() => setIsLiked(!isLiked)} 
          className={`text-3xl ${isLiked ? 'text-spotify-green' : 'text-spotify-text'}`}
        >
          <Heart size={32} fill={isLiked ? "#1DB954" : "none"} />
        </button>
        
        <button className="text-spotify-text hover:text-white">
          <ThreeDots size={24} />
        </button>
      </div>
    </div>
  );
};

export default NowPlaying;
