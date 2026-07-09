import { useEffect, useState} from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { useSelector } from "react-redux";
import { generateRandomMessage, generateRandomName } from "../utils/helper";

const LiveChat = () => {
  const [liveMessage, setLiveMessage] = useState("");
  const dispatch = useDispatch();

  const chatMessages = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      // API Polling

      dispatch(
        addMessage({
          name: generateRandomName(),
          message: generateRandomMessage(20) ,
        })
      );
    }, 2000);

    return () => clearInterval(i);
  }, []);

  return (
    <>
      <div className="w-full h-[600px] ml-2 p-2 border border-gray-400 rounded-lg overflow-y-scroll flex flex-col-reverse">
        <div>
          {
            // Disclaimer: Don't use indexes as keys
            chatMessages.map((c, i) => (
              <ChatMessage key={i} name={c.name} message={c.message} />
            ))
          }
        </div>
      </div>

      <form
        className=" ml-[8px] w-full border border-gray-400 my-2 rounded-lg p-2 flex flex-wrap items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();

          dispatch(
            addMessage({
              name: "Vikash Gupta",
              message: liveMessage,
            })
          );
          setLiveMessage("");
        }}
      >
        <input
          className="flex-1 min-w-0 border border-black p-2 rounded-lg"
          type="text"
          value={liveMessage}
          onChange={(e) => {
            setLiveMessage(e.target.value);
          }}
        />
        <button className="border border-black p-2 rounded-lg bg-gray-100 hover:bg-gray-200">Send</button>
      </form>
    </>
  );
};
export default LiveChat;