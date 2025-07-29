import { useParams } from "react-router"
import { useState } from "react";

const Chatpage = () => {

  const { id: targetUserId } = useParams();
  
  const [chatClient, setChatClient] = useState(null);
  const [chatChannel, setChatChannel] = useState(null);


  return (
    <div>Chatpage</div>
  )
}

export default Chatpage