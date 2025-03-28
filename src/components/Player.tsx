
import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Heart, Maximize2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [volume, setVolume] = useState(70);

  return (
    <div className="h-20 bg-spotify-black border-t border-spotify-lightgray flex items-center px-4 justify-between">
      {/* Now playing info */}
      <div className="flex items-center gap-4 w-1/4">
        <div className="h-14 w-14 bg-spotify-lightgray rounded flex-shrink-0">
          <img 
            src="https://via.placeholder.com/56" 
            alt="Album cover" 
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div>
          <div className="text-white text-sm font-semibold hover:underline cursor-pointer">Bohemian Rhapsody</div>
          <div className="text-xs text-spotify-text hover:underline hover:text-white cursor-pointer">Queen</div>
        </div>
        <button 
          onClick={() => setIsLiked(!isLiked)} 
          className={`ml-4 ${isLiked ? 'text-spotify-green' : 'text-spotify-text hover:text-white'}`}
        >
          <Heart size={16} fill={isLiked ? "#1DB954" : "none"} />
        </button>
      </div>

      {/* Player controls */}
      <div className="flex flex-col items-center w-2/4">
        <div className="flex items-center gap-5 mb-2">
          <button className="text-spotify-text hover:text-white">
            <Shuffle size={20} />
          </button>
          <button className="text-spotify-text hover:text-white">
            <SkipBack size={20} />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white rounded-full p-2 text-black hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button className="text-spotify-text hover:text-white">
            <SkipForward size={20} />
          </button>
          <button className="text-spotify-text hover:text-white">
            <Repeat size={20} />
          </button>
        </div>
        
        <div className="flex items-center gap-2 w-full">
          <div className="text-xs text-spotify-text">1:21</div>
          <div className="relative flex-1 h-1 bg-spotify-lightgray rounded-full">
            <div className="absolute h-full w-1/3 bg-spotify-text rounded-full hover:bg-spotify-green"></div>
          </div>
          <div className="text-xs text-spotify-text">4:35</div>
        </div>
      </div>

      {/* Volume controls */}
      <div className="flex items-center gap-2 w-1/4 justify-end">
        <Maximize2 size={18} className="text-spotify-text hover:text-white cursor-pointer" />
        <Volume2 size={18} className="text-spotify-text hover:text-white" />
        <Slider
          className="w-24"
          value={[volume]}
          max={100}
          step={1}
          onValueChange={(value) => setVolume(value[0])}
        />
      </div>
    </div>
  );
};

export default Player;
