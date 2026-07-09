


import { useEffect, useState } from "react";
import { GOOGLE_API_KEY } from "../utils/constant";


const timeAgo = (publishedAt) => {
  const currentDate = new Date();
  const commentDate = new Date(publishedAt);

  const diffInMs = currentDate - commentDate;
  const diffInSecs = diffInMs / 1000;
  const diffInMins = diffInSecs / 60;
  const diffInHours = diffInMins / 60;
  const diffInDays = diffInHours / 24;
  const diffInMonths = diffInDays / 30; 
  const diffInYears = diffInDays / 365; 

  let timeAgoText = "";

  if (diffInSecs < 60) {
    timeAgoText = Math.floor(diffInSecs) + " seconds ago";
  } else if (diffInMins < 60) {
    timeAgoText = Math.floor(diffInMins) + " minutes ago";
  } else if (diffInHours < 24) {
    timeAgoText = Math.floor(diffInHours) + " hours ago";
  } else if (diffInDays < 30) {
    timeAgoText = Math.floor(diffInDays) + " days ago";
  } else if (diffInMonths < 12) {
    timeAgoText = Math.floor(diffInMonths) + " months ago";
  } else {
    timeAgoText = Math.floor(diffInYears) + " years ago";
  }

  return timeAgoText;
};

const CommentContainer = ({ id }) => {
  const [info, setInfo] = useState([]);

  const getComments = async () => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?key=${GOOGLE_API_KEY}&textFormat=plainText&part=snippet&videoId=${id}&maxResults=100`);
    const json = await response.json();
  
    setInfo(json.items);
  };

  useEffect(() => {
    if (id) {
      getComments();
    }
  }, [id]);

  return (
    <div className="comments-container bg-white p-3 md:p-4 rounded-lg shadow-md mt-4 w-full">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-2 md:mb-4">Comments</h1>
      <ul className="comments-list space-y-3 md:space-y-4">
        {info.map((user, index) => (
          <li key={index} className="comment-item p-2 md:p-4 border-b border-gray-200">
            <div className="flex gap-2 md:gap-3 items-start">
              <img
                className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                src={user?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl}
                alt="user profile"
              />
              <div className="comment-content flex-1 min-w-0">
                <div className="comment-header flex items-center space-x-2">
                  <span className="font-semibold text-xs md:text-sm truncate">
                    {user?.snippet?.topLevelComment?.snippet?.authorDisplayName}
                  </span>
                </div>
                <p className="comment-text text-gray-800 mt-1 md:mt-2 text-xs md:text-sm break-words">
                  {user?.snippet?.topLevelComment?.snippet?.textDisplay}
                </p>
                <div className="comment-footer mt-1 md:mt-2 text-gray-500 text-xs">
                  <span>{timeAgo(user?.snippet?.topLevelComment?.snippet?.publishedAt)}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentContainer;