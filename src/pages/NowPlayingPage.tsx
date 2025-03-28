
import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player";
import NowPlaying from "@/components/NowPlaying";
import TrackList from "@/components/TrackList";

const NowPlayingPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto bg-spotify-darkgray">
          <NowPlaying />
          
          <div className="p-6 pb-32">
            <h2 className="text-2xl font-bold text-white mb-4">Album Tracks</h2>
            <TrackList />
          </div>
        </main>
      </div>
      
      <Player />
    </div>
  );
};

export default NowPlayingPage;
