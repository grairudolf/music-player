
import { Play, Clock } from "lucide-react";
import { useState } from "react";

// Mock data for tracks
const tracks = [
  {
    id: "1",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    duration: "5:55",
    albumArt: "https://via.placeholder.com/40",
  },
  {
    id: "2",
    title: "Stairway to Heaven",
    artist: "Led Zeppelin",
    album: "Led Zeppelin IV",
    duration: "8:02",
    albumArt: "https://via.placeholder.com/40",
  },
  {
    id: "3",
    title: "Imagine",
    artist: "John Lennon",
    album: "Imagine",
    duration: "3:03",
    albumArt: "https://via.placeholder.com/40",
  },
  {
    id: "4",
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    album: "Nevermind",
    duration: "5:01",
    albumArt: "https://via.placeholder.com/40",
  },
  {
    id: "5",
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
    duration: "6:30",
    albumArt: "https://via.placeholder.com/40",
  },
  {
    id: "6",
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    album: "Appetite for Destruction",
    duration: "5:56",
    albumArt: "https://via.placeholder.com/40",
  },
  {
    id: "7",
    title: "Like a Rolling Stone",
    artist: "Bob Dylan",
    album: "Highway 61 Revisited",
    duration: "6:13",
    albumArt: "https://via.placeholder.com/40",
  },
];

const TrackList = () => {
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);

  return (
    <div className="w-full">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-spotify-lightgray text-spotify-text text-sm">
            <th className="px-4 py-2 w-12">#</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Album</th>
            <th className="px-4 py-2 flex items-center justify-end pr-8">
              <Clock size={16} />
            </th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((track, index) => (
            <tr 
              key={track.id}
              className="hover:bg-spotify-lightgray group"
              onMouseEnter={() => setHoveredTrack(track.id)}
              onMouseLeave={() => setHoveredTrack(null)}
            >
              <td className="px-4 py-3 w-12">
                {hoveredTrack === track.id ? (
                  <Play size={14} className="text-white" />
                ) : (
                  <span className="text-spotify-text">{index + 1}</span>
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={track.albumArt} 
                    alt={track.album} 
                    className="w-10 h-10 rounded" 
                  />
                  <div>
                    <div className="text-white text-sm">{track.title}</div>
                    <div className="text-spotify-text text-sm">{track.artist}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-spotify-text text-sm">{track.album}</td>
              <td className="px-4 py-3 text-spotify-text text-sm text-right">{track.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrackList;
