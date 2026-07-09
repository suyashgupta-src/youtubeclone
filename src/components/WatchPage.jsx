
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router';
import CommentContainer from './CommentContainer';
import LiveChat from './LiveChat';
import { GOOGLE_API_KEY } from '../utils/constant';
import ChannelDetail from './ChannelDetail';

const WatchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [channelId, setChannelId] = useState("");
  const videoId = searchParams.get('v');

  const getChannelId = async () => {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${GOOGLE_API_KEY}`);
    const json = await response.json();
    setChannelId(json?.items[0]?.snippet?.channelId);
  };

  useEffect(() => {
    getChannelId();
  }, []);  

  useEffect(() => {
    dispatch(closeMenu());
  }, [dispatch]); 

  return (
    <div className="mt-16 px-4 md:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
        <div className="w-full lg:max-w-5xl pt-4 lg:pt-8">
          <iframe
            className="w-full rounded-xl shadow-lg aspect-video"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          <div className="mt-4 md:mt-6">
            <ChannelDetail id={channelId} />
          </div>
        </div>
        <div className="w-full lg:flex-1 pt-4 lg:pt-8">
          <LiveChat />
        </div>
      </div>
      <CommentContainer id={videoId} />
    </div>
  );
};

export default WatchPage;

