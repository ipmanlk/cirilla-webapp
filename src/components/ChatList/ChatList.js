import React from "react";
import MsgBubble from "../MsgBubble/MsgBubble";

class ChatList extends React.Component {
    // reference to the last msg
    messagesEndRef = React.createRef();

    componentDidUpdate() {
        if (this.messagesEndRef.current) this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.messagesEndRef.current.scrollIntoView();
    }

    render() {
        return (
            <div>
                {this.props.chats.map((chat, i) => <MsgBubble key={i} type={chat.type} msg={chat.msg} time={chat.time} />)}

                <div style={{ float: "left", clear: "both" }}
                    ref={this.messagesEndRef}>
                </div>
            </div>

        )
    }
}

export default ChatList;