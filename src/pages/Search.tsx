
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player";
import PlaylistGrid from "@/components/PlaylistGrid";
import { Search as SearchIcon } from "lucide-react";

// Mock data for browse categories
const categories = [
  { id: "1", name: "Pop", color: "#8450c1", image: "https://via.placeholder.com/150" },
  { id: "2", name: "Hip-Hop", color: "#ba5d07", image: "https://via.placeholder.com/150" },
  { id: "3", name: "Rock", color: "#e91429", image: "https://via.placeholder.com/150" },
  { id: "4", name: "Dance/Electronic", color: "#dc148c", image: "https://via.placeholder.com/150" },
  { id: "5", name: "R&B", color: "#1e3264", image: "https://via.placeholder.com/150" },
  { id: "6", name: "Indie", color: "#477d95", image: "https://via.placeholder.com/150" },
  { id: "7", name: "Latin", color: "#e1118c", image: "https://via.placeholder.com/150" },
  { id: "8", name: "Jazz", color: "#777777", image: "https://via.placeholder.com/150" },
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6 bg-spotify-darkgray">
          <div className="sticky top-0 z-10 pt-4 pb-6 bg-spotify-darkgray">
            <div className="relative w-full max-w-lg">
              <SearchIcon size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black" />
              <input
                type="text"
                placeholder="What do you want to listen to?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-transparent rounded-full py-3 pl-12 pr-4 text-black placeholder:text-gray-500 focus:outline-none"
              />
            </div>
          </div>
          
          {searchTerm ? (
            <div className="mt-4">
              <PlaylistGrid title="Top result" />
              <PlaylistGrid title="Songs" />
              <PlaylistGrid title="Playlists" />
              <PlaylistGrid title="Artists" />
              <PlaylistGrid title="Albums" />
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Browse all</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="relative overflow-hidden rounded-lg aspect-square"
                    style={{ backgroundColor: category.color }}
                  >
                    <h3 className="text-2xl font-bold text-white p-4">{category.name}</h3>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="absolute bottom-0 right-0 w-24 h-24 transform rotate-25 translate-x-4 translate-y-4"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
      
      <Player />
    </div>
  );
};

export default Search;
