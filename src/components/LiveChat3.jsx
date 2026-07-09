
// import { useEffect, useState } from "react";
// import ChatMessage from "./ChatMessage";
// import { useDispatch } from "react-redux";
// import { addMessage } from "../utils/chatSlice";
// import { useSelector } from "react-redux";
// import { generateRandomMessage, generateRandomName } from "../utils/helper";



// const LiveChat = () =>{

//     const [liveMessage , setLiveMessage] = useState([]);

//     const dispatch = useDispatch();
//     const ChatMessages = useSelector(store => store.chat.messages);

//     useEffect(()=>{
//         const interval = setInterval(()=>{
//             dispatch(addMessage({
//                 name: generateRandomName(),
//                 message: generateRandomMessage()
//             }))
//         } , 1500);

//         return ()=> clearInterval(interval);
//     } , [])

//     return (
//       <>
//         <div className="w-full h-[500px] border border-black rounded-lg bg-gray-100 overflow-y-scroll flex flex-col-reverse">
//             <div>
//                 {
//                   ChatMessages.map((c , index) => (
//                     <ChatMessage key={index} name = {c.name} message = {c.message} />
//                   ))
//                 }
//             </div> 
             
//         </div>

//          <form className="w-full border border-gray-400 my-2 rounded-lg" onSubmit={(e) => { e.preventDefault()
//                                                                                                dispatch(addMessage({
//                                                                                                     name: "Vikash",
//                                                                                                     message: liveMessage,
//                                                                                                }))
//                                                                                                setLiveMessage("");
//                                                                                              }}>
//             <input className="border border-black my-2 p-2 rounded-lg ml-4 w-90" type="text" value = {liveMessage} onChange={(e) => {
//                                                                                                                             setLiveMessage(e.target.value);
//                                                                                                                             }} />
//             <button className="ml-4 border border-black p-2 rounded-lg bg-gray-100 ">Send</button>
//          </form>
//        </>    
//     )
// }

// export default LiveChat;

import { useEffect, useState, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { useSelector } from "react-redux";
import { generateRandomMessage, generateRandomName } from "../utils/helper";

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const chatContainerRef = useRef(null);
  
  const dispatch = useDispatch();
  const chatMessages = useSelector(store => store.chat.messages);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = 0; // Scroll to top when using flex-reverse
    }
  }, [chatMessages]);

  // Generate random messages
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(addMessage({
        name: generateRandomName(),
        message: generateRandomMessage()
      }));
    }, 1500);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (liveMessage.trim() !== "") {
      dispatch(addMessage({
        name: "Vikash",
        message: liveMessage,
      }));
      setLiveMessage("");
    }
  };

  return (
    <>
      {/* Chat container - this will be scrollable */}
      <div 
        ref={chatContainerRef}
        className="w-full h-[300px] sm:h-[400px] md:h-[500px] border border-black rounded-lg bg-gray-100 overflow-y-auto"
      >
        {/* Inner message container - use flex-col-reverse to show newest at bottom */}
        <div className="w-full flex flex-col-reverse"> 
          {/* Render messages in original order (not reversed) */}
          {chatMessages.map((c, index) => (
            <ChatMessage key={index} name={c.name} message={c.message} />
          ))}
        </div>
      </div>

      <form 
        className="w-full border border-gray-400 my-2 rounded-lg p-2 flex flex-wrap items-center gap-2"
        onSubmit={handleSubmit}
      >
        <input 
          className="flex-1 min-w-0 border border-black p-2 rounded-lg"
          type="text" 
          value={liveMessage} 
          onChange={(e) => setLiveMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button 
          className="border border-black p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          type="submit"
        >
          Send
        </button>
      </form>
    </>
  );
};

export default LiveChat;

