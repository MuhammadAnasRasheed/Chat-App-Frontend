import { useEffect } from "react"
import { useChatstore } from "../Store/useChatstore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./Skeletons/MessageSkeleton";
import { useAuthStore } from "../Store/useAuthstore";
import { formatMessageTime } from "../lib/util";


const ChatContainer = () => {
  const{message,ismessageloading,getmessage,selecteduser,setselecteduser}=useChatstore();
  const{Authuser}=useAuthStore();
  useEffect(() => {
  getmessage(selecteduser._id)
  }, [selecteduser._id,getmessage])

  if (ismessageloading) {
    return(
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {message.map((message)=>(
          <div
          key={message._id}
          className={`chat ${message.SenderId===Authuser._id?"chat-end":"chat-start"}`}
          >
          <div className="chat-header mb-1">
            <time className="text-xs opacity-50 ml-1 mt-2">
              {formatMessageTime(message.createdAt)}
            </time>
            <div className="chat-bubble flex">
              {message.text &&<p>{message.text}</p>}
            </div>
          </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  )
}

export default ChatContainer