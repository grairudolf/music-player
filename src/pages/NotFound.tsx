
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-spotify-darkgray">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-spotify-text mb-4">Page not found</p>
        <p className="text-spotify-text mb-8">We can't seem to find the page you're looking for.</p>
        <Link 
          to="/" 
          className="bg-spotify-green text-black py-3 px-8 rounded-full font-bold hover:scale-105 transition-transform inline-block"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
