import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import { GOOGLE_API_KEY } from "../utils/constant";


const SuggestionPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&type=video&key=${GOOGLE_API_KEY}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        setSearchResults(json.items || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="pt-20 px-5">
      <h1 className="text-2xl mb-5">Search Results for: <span className="font-semibold">{query}</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.map((video) => (
          <div key={video.id.videoId} className=" p-3 rounded shadow hover:shadow-lg transition">
            <Link to={`/watch?v=${video.id.videoId}`}>
              <img 
                src={video.snippet.thumbnails.medium.url} 
                alt={video.snippet.title} 
                className="w-full rounded"
              />
              <h2 className="font-bold mt-2">{video.snippet.title}</h2>
              <p className="text-sm text-gray-600">{video.snippet.channelTitle}</p>
            </Link>
          </div>
        ))}
       
      </div>
    </div>
  );
};

export default SuggestionPage;
