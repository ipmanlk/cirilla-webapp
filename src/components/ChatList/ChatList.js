import React from "react";
import MsgBubble from "../MsgBubble/MsgBubble";

function ChatList(props) {
    return props.chats.map((chat, i) => <MsgBubble key={i} type={chat.type} msg={chat.msg}/>)
}

export default ChatList;