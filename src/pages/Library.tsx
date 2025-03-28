
import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player";
import { Grid, List, Plus, ChevronDown } from "lucide-react";

// Mock data for library items
const libraryItems = [
  {
    id: "1",
    title: "Liked Songs",
    type: "Playlist",
    pinned: true,
    coverImage: "https://via.placeholder.com/60",
  },
  {
    id: "2",
    title: "My Playlist #1",
    type: "Playlist",
    pinned: false,
    coverImage: "https://via.placeholder.com/60?text=P1",
  },
  {
    id: "3",
    title: "Discover Weekly",
    type: "Playlist",
    pinned: true,
    coverImage: "https://via.placeholder.com/60?text=DW",
  },
  {
    id: "4",
    title: "Release Radar",
    type: "Playlist",
    pinned: false,
    coverImage: "https://via.placeholder.com/60?text=RR",
  },
  {
    id: "5",
    title: "The Beatles",
    type: "Artist",
    pinned: false,
    coverImage: "https://via.placeholder.com/60?text=TB",
  },
  {
    id: "6",
    title: "Queen",
    type: "Artist",
    pinned: false,
    coverImage: "https://via.placeholder.com/60?text=Q",
  },
  {
    id: "7",
    title: "Abbey Road",
    type: "Album",
    pinned: false,
    coverImage: "https://via.placeholder.com/60?text=AR",
  },
];

const Library = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [filterBy, setFilterBy] = useState<string | null>(null);
  
  const filters = ["Playlists", "Artists", "Albums", "Downloaded"];

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto bg-spotify-darkgray">
          <div className="sticky top-0 z-10 pt-4 px-6 pb-2 bg-spotify-darkgray">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-white">Your Library</h1>
              <div className="flex gap-2">
                <button className="text-spotify-text hover:text-white">
                  <Plus size={24} />
                </button>
                <button 
                  className="text-spotify-text hover:text-white"
                  onClick={() => setViewMode(viewMode === "list" ? "grid" : "list")}
                >
                  {viewMode === "list" ? <Grid size={24} /> : <List size={24} />}
                </button>
              </div>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <button className="flex items-center gap-1 bg-spotify-lightgray rounded-full px-3 py-1 text-sm text-white">
                <span>Recents</span>
                <ChevronDown size={16} />
              </button>
              
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`rounded-full px-3 py-1 text-sm ${
                    filterBy === filter
                      ? "bg-white text-black"
                      : "bg-spotify-lightgray text-white"
                  }`}
                  onClick={() => setFilterBy(filterBy === filter ? null : filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-6">
            {viewMode === "list" ? (
              <div className="space-y-2">
                {libraryItems.map((item) => (
                  <Link
                    to={`/playlist/${item.id}`}
                    key={item.id}
                    className="flex items-center p-2 hover:bg-spotify-lightgray rounded-md transition-colors duration-200"
                  >
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className={`w-12 h-12 mr-3 ${item.type === "Artist" ? "rounded-full" : "rounded"}`}
                    />
                    <div>
                      <div className="text-white font-semibold">{item.title}</div>
                      <div className="text-spotify-text text-sm">{item.type} {item.pinned && "• Pinned"}</div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {libraryItems.map((item) => (
                  <Link
                    to={`/playlist/${item.id}`}
                    key={item.id}
                    className="bg-spotify-lightgray rounded-md p-4 hover:bg-opacity-80 transition-all duration-200"
                  >
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className={`w-full aspect-square object-cover mb-4 ${item.type === "Artist" ? "rounded-full" : "rounded"}`}
                    />
                    <div className="text-white font-semibold truncate">{item.title}</div>
                    <div className="text-spotify-text text-sm truncate">{item.type} {item.pinned && "• Pinned"}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
      
      <Player />
    </div>
  );
};

export default Library;
