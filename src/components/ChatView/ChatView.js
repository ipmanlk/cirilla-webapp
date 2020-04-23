import React from "react";
import UserBar from "../../components/UserBar/UserBar";
import ChatBox from "../../components/ChatBox/ChatBox";
import ChatList from "../../components/ChatList/ChatList";
import getResponse from "../../api/api";

class ChatView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            msgs: [],
            currentMsg: "",
            inputReadOnly: false,
            inputPlaceHolder: "Type a message",
            botStatus: "Online"
        }
    }

    componentDidMount = () => {
        const chats = localStorage.getItem("chats");
        if (chats) {
            this.setState({ msgs: JSON.parse(chats) });
        }
    }

    typeMsg = (e) => {
        this.setState({ currentMsg: e.target.value });
        if (e.key === "Enter") {
            this.sendMsg();
        }
    }

    sendMsg = () => {
        if (this.state.currentMsg.trim() === "") return;
        this.addMsg();
        this.getReply();
    }

    addMsg = () => {
        this.setState({ msgs: [...this.state.msgs, { type: "sent", msg: this.state.currentMsg, time: this.getTime() }] });
        this.setState({ currentMsg: "" });

        // save chat
        localStorage.setItem("chats", JSON.stringify(this.state.msgs));
    }

    addReply = (reply) => {
        this.setState({ msgs: [...this.state.msgs, { type: "received", msg: reply, time: this.getTime() }] });

        // save chat
        localStorage.setItem("chats", JSON.stringify(this.state.msgs));
    }

    getReply = () => {
        this.setState({
            inputReadOnly: true,
            botStatus: "Typing...",
            inputPlaceHolder: "Wait until she send a reply"
        });

        getResponse(this.state.currentMsg).then(reply => {
            this.addReply(reply);
        }).catch(reply => {
            this.addReply(reply);
        }).finally(() => {
            this.setState({
                inputReadOnly: false,
                botStatus: "Online",
                inputPlaceHolder: "Type a message",
            });
        });
    }

    getTime = () => {
        const date = new Date();
        let hours = date.getHours();
        let mins = date.getMinutes();
        hours = hours < 10 ? "0" + hours : hours;
        mins = mins < 10 ? "0" + mins : mins;
        return `${hours}:${mins}`;
    }

    render() {
        return (
            <div className="chat-container">
                <UserBar botStatus={this.state.botStatus} />
                <div className="conversation">
                    <div className="conversation-container">
                        <ChatList chats={this.state.msgs} />
                    </div>
                    <ChatBox sendMsg={this.sendMsg} typeMsg={this.typeMsg} currentMsg={this.state.currentMsg} readOnly={this.state.inputReadOnly} inputPlaceHolder={this.state.inputPlaceHolder} />
                </div>
            </div>
        )
    }
}

export default ChatView;