
const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { channelTitle, title, thumbnails } = snippet;

  return (
    <div className="p-2 m-2 w-full max-w-xs shadow-lg rounded-lg flex flex-col bg-white mx-auto lg:ml-3">
      <img className="rounded-lg w-full h-44 object-cover" src={thumbnails?.medium?.url} alt="thumbnail" />
      <ul className="flex-1 flex flex-col justify-between p-2">
        <li className="font-bold text-sm line-clamp-2">{title}</li>
        <li className="text-gray-600 text-xs">{channelTitle}</li>
        <li className="text-gray-600 text-xs">{statistics.viewCount} views</li>
      </ul>
    </div>
  );
};

export default VideoCard

