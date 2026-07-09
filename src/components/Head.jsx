// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleMenu } from "../utils/appSlice";
// import {
//   bell_icon,
//   hemburger_icon,
//   mic_icon,
//   search_icon,
//   youtube_logo,
//   YOUTUBE_SEARCH_API,
//   user_icon,
// } from "../utils/constant";
// import { Link } from "react-router"; 
// import { cacheResults } from "../utils/searchSlice";

// const Head = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);

//   const searchCache = useSelector((store) => store.search);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!searchQuery) {
//       setSuggestions([]);
//       return;
//     }

//     // Debouncing logic
//     const timer = setTimeout(() => {
//       if (searchCache[searchQuery]) {
//         setSuggestions(searchCache[searchQuery]); 
//       } else {
//         getSearchSuggestions();
//       }
//     }, 200);

//     return () => clearTimeout(timer);
//   }, [searchQuery]);

//   const getSearchSuggestions = async () => {
//     try {
//       const proxyUrl = "https://api.allorigins.win/get?url=";
//       const apiUrl = encodeURIComponent(`http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${searchQuery}`);
  
//       const response = await fetch(proxyUrl + apiUrl);
//       const data = await response.json();
//       const json = JSON.parse(data.contents);
  
//       if (json[1]) {
//         setSuggestions(json[1]);
//         dispatch(cacheResults({ [searchQuery]: json[1] }));
//       } else {
//         setSuggestions([]);
//       }
//     } catch (error) {
//       console.error("Error fetching search suggestions:", error);
//     }
//   };
  
  

//   const toggleMenuHandler = () => {
//     dispatch(toggleMenu());
//   };

//   return (
//     <div className="flex flex-wrap items-center bg-gray-100 px-4 py-2 fixed z-50 top-0 left-0 w-full">
      
//       <div className="flex items-center flex-shrink-0">
//         <img
//           onClick={toggleMenuHandler}
//           className="w-10 h-10 p-2 sm:w-12 sm:h-12 cursor-pointer"
//           src={hemburger_icon}
//           alt="menu"
//         />
//         <Link to="/">
//           <img className="w-16 h-10 sm:w-20 sm:h-14" src={youtube_logo} alt="YouTube" />
//         </Link>
//       </div>

//       {/* Search Bar */}
//       <div className="flex items-center flex-grow justify-center mt-2 sm:mt-0 relative">
//         <input
//           className="border border-gray-300 w-full max-w-[200px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[600px] px-4 py-2 rounded-l-full bg-white"
//           type="text"
//           placeholder="Search"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           onFocus={() => setShowSuggestions(true)}
//           onBlur={() => setShowSuggestions(false)}
//         />
//         <button className="border border-gray-300 border-l-0 px-4 py-2 rounded-r-full text-gray-500">
//           <img src={search_icon} alt="search-icon" className="mr-2" />
//         </button>
//         <img className="h-6 ml-2 sm:ml-4 rounded-full" src={mic_icon} alt="mic-icon" />

//         {/* Search Suggestions */}
//         {showSuggestions && searchQuery.length > 0 && suggestions.length > 0 && (
//           <div className="absolute top-full left-0 w-full max-w-[600px] bg-white border border-gray-300 rounded-lg mt-2 shadow-md z-10 ml-72">
//             <ul>
//               {suggestions.map((suggestion, index) => (
//                 <li key={index} className="px-4 py-1 cursor-pointer hover:bg-gray-300 flex items-center">
//                   <img src={search_icon} alt="search-icon" className="mr-2" />
//                   {suggestion}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>

//       {/* User & Notifications */}
//       <div className="flex items-center mt-2 sm:mt-0">
//         <img className="h-6 sm:h-8 mr-2 sm:mr-4" src={bell_icon} alt="bell-icon" />
//         <img className="h-6 w-6 sm:h-8 sm:w-8 rounded-full" src={user_icon} alt="user" />
//       </div>
//     </div>
//   );
// };

// export default Head;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import {
  bell_icon,
  hemburger_icon,
  mic_icon,
  search_icon,
  youtube_logo,
  YOUTUBE_SEARCH_API,
  user_icon,
} from "../utils/constant";
import { Link } from "react-router";
import { cacheResults } from "../utils/searchSlice";


import { useNavigate } from "react-router";




const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const navigate = useNavigate();  

  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchQuery) {
      setSuggestions([]);
      return;
    }

    //caching logic
    if (searchCache[searchQuery]) {
      setSuggestions(searchCache[searchQuery]); 
    } 

    const timer = setTimeout(() => {
        getSearchSuggestions();
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    try {
      const proxyUrl = "https://api.allorigins.win/get?url=";

      //encodeURIComponent() converts special characters in a string to a format that can be safely included in a URL.
      const apiUrl = encodeURIComponent(`http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${searchQuery}`);
  
      const response = await fetch(proxyUrl + apiUrl);
      const data = await response.json();
      const json = JSON.parse(data.contents);
  
      if (json[1]) {
        setSuggestions(json[1]);
        dispatch(cacheResults({ [searchQuery]: json[1] }));
      } else {
        setSuggestions([]);
      }
    }
     catch (error) {
      console.error("Error fetching search suggestions:", error);
    }
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const handleSuggectionClick = async (suggestion)=>{
    try{
      navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    }
    catch(error){
      console.error("Error handling suggestion click:" , error);
    }
  }

  
  return (
    <div className="flex items-center justify-between bg-white px-4 py-2 fixed z-50 top-0 left-0 w-full shadow-md">
      <div className="flex items-center min-w-max mr-2 sm:mr-4">
        <img
          onClick={toggleMenuHandler}
          className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer"
          src={hemburger_icon}
          alt="menu"
        />
        <Link to="/">
          <img className="w-20 h-10 sm:w-24 sm:h-12 ml-2" src={youtube_logo} alt="YouTube" />
        </Link>
      </div>

      <div className="flex items-center flex-grow max-w-xl mx-2 relative">
        <input
          className="border border-gray-300 w-full px-4 py-2 rounded-l-full bg-white focus:outline-none"
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => {
            setTimeout(() => {
              setShowSuggestions(false);
            }, 200); 
          }}
        />
        <button className="border border-gray-300 border-l-0 px-4 py-[10px] rounded-r-full text-gray-500">
          <img src={search_icon} alt="search-icon" className="w-5 h-5" />
        </button>
        <img className="h-6 w-6 ml-3 rounded-full cursor-pointer" src={mic_icon} alt="mic-icon" />

        {showSuggestions && searchQuery.length > 0 && suggestions.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-2 shadow-md z-10">
            <ul>
              {suggestions.map((suggestion, index) => (
                <li key={index} className="px-4 py-2 cursor-pointer hover:bg-gray-200 flex items-center" onMouseDown = {()=>handleSuggectionClick(suggestion)}>
                  <img src={search_icon} alt="search-icon" className="w-4 h-4 mr-2" />
                   {suggestion} 
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex items-center min-w-max ml-2 sm:ml-4">
        <img className="h-6 w-6 sm:h-7 sm:w-7 mr-3 cursor-pointer" src={bell_icon} alt="bell-icon" />
        <img className="h-8 w-8 sm:h-10 sm:w-10 rounded-full cursor-pointer" src={user_icon} alt="user" />
      </div>
    </div>
  );
};

export default Head;