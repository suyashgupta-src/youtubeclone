


import React, { useEffect, useState } from 'react';
import { GOOGLE_API_KEY } from '../utils/constant';

const ChannelDetail = ({ id }) => {
  const [channelName, setChannelName] = useState('Loading...');
  const [channelIcon, setChannelIcon] = useState(null);
  const [subscriberCount, setSubscriberCount] = useState(0);

  const getChannelDetail = async () => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${id}&key=${GOOGLE_API_KEY}`);
    const data = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${id}&key=${GOOGLE_API_KEY}`)
    
    const json = await response.json();
    const data_json = await data.json();

   
    
    if (!response.ok || !json.items || json.items.length === 0) {
      setChannelName('Unknown Channel');
      setChannelIcon('https://via.placeholder.com/150'); 
      return;
    }

    setSubscriberCount(data_json?.items[0]?.statistics?.subscriberCount);
    setChannelName(json.items[0].snippet.localized.title);
    setChannelIcon(json.items[0].snippet.thumbnails.default.url);
  };

  useEffect(() => {
    if (id) {
      getChannelDetail();
    }
  }, [id]);

  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-4">
      <img className="w-10 h-10 md:w-12 md:h-12 rounded-full" src={channelIcon} alt="Channel Icon" />
      <div className="flex flex-col">
        <div className="font-bold text-base md:text-lg truncate max-w-[180px] sm:max-w-none">{channelName}</div>
        <div className="text-xs md:text-sm">{subscriberCount} subscribers</div>
      </div>
      <button className="bg-black rounded-xl p-1.5 md:p-2 text-sm md:text-base text-white ml-2 md:ml-5">Subscribe</button>
    </div>
  );
};

export default ChannelDetail;
