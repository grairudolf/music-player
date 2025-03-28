
import { Link } from "react-router-dom";

// Mock data for playlists
const playlists = [
  {
    id: "1",
    title: "Today's Top Hits",
    description: "Dua Lipa is on top of the Hottest 50!",
    coverImage: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    title: "RapCaviar",
    description: "New music from Kendrick Lamar, Drake and more",
    coverImage: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    title: "All Out 80s",
    description: "The biggest hits of the 1980s.",
    coverImage: "https://via.placeholder.com/150",
  },
  {
    id: "4",
    title: "Rock Classics",
    description: "Rock legends & epic songs that continue to inspire generations",
    coverImage: "https://via.placeholder.com/150",
  },
  {
    id: "5",
    title: "Chill Hits",
    description: "Kick back to the best new and recent chill hits",
    coverImage: "https://via.placeholder.com/150",
  },
  {
    id: "6",
    title: "Viva Latino",
    description: "Today's top Latin hits, elevando nuestra música",
    coverImage: "https://via.placeholder.com/150",
  },
];

const PlaylistGrid = ({ title }: { title: string }) => {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <Link to="/playlists" className="text-sm text-spotify-text font-bold hover:underline">
          Show all
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {playlists.map((playlist) => (
          <Link
            to={`/playlist/${playlist.id}`}
            key={playlist.id}
            className="bg-spotify-lightgray rounded-md p-4 hover:bg-opacity-80 transition-all duration-200 group"
          >
            <div className="relative mb-4">
              <img
                src={playlist.coverImage}
                alt={playlist.title}
                className="w-full aspect-square object-cover rounded shadow-lg"
              />
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button className="bg-spotify-green text-black rounded-full p-3 shadow-lg hover:scale-105 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </button>
              </div>
            </div>
            <h3 className="text-white font-bold truncate">{playlist.title}</h3>
            <p className="text-spotify-text text-sm line-clamp-2 mt-1">{playlist.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlaylistGrid;
