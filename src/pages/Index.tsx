
import Sidebar from "@/components/Sidebar";
import Player from "@/components/Player";
import PlaylistGrid from "@/components/PlaylistGrid";
import TrackList from "@/components/TrackList";

const Index = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-[#303030] to-spotify-darkgray">
          <h1 className="text-3xl font-bold text-white mb-6">Good evening</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {/* Recently played items */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item}
                className="flex items-center bg-spotify-lightgray bg-opacity-40 rounded overflow-hidden hover:bg-opacity-60 transition-all duration-200 group"
              >
                <img
                  src={`https://via.placeholder.com/80?text=Playlist${item}`}
                  alt={`Playlist ${item}`}
                  className="h-16 w-16"
                />
                <span className="font-bold text-white px-4">Playlist {item}</span>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200 mr-4">
                  <button className="bg-spotify-green rounded-full p-2 shadow-lg hover:scale-105 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <PlaylistGrid title="Made for you" />
          <PlaylistGrid title="Recently played" />
          
          <div className="mt-10 mb-32">
            <h2 className="text-2xl font-bold text-white mb-4">Top tracks this month</h2>
            <TrackList />
          </div>
        </main>
      </div>
      
      <Player />
    </div>
  );
};

export default Index;
