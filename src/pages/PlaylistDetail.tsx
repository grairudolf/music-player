
import { useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player";
import TrackList from "@/components/TrackList";
import PlaylistHeader from "@/components/PlaylistHeader";

const PlaylistDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - in a real application, you would fetch this based on the id
  const playlist = {
    id: id || "1",
    title: "Today's Top Hits",
    description: "Dua Lipa is on top of the Hottest 50!",
    coverImage: "https://via.placeholder.com/300",
    songCount: 50,
    duration: "2 hr 43 min",
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // In a real application, you would filter tracks based on the search term
    console.log("Searching for:", term);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto bg-spotify-darkgray">
          <PlaylistHeader
            title={playlist.title}
            description={playlist.description}
            coverImage={playlist.coverImage}
            songCount={playlist.songCount}
            duration={playlist.duration}
            onSearch={handleSearch}
          />
          
          <div className="px-6 pb-32">
            <TrackList />
          </div>
        </main>
      </div>
      
      <Player />
    </div>
  );
};

export default PlaylistDetail;
