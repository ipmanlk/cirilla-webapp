import React from "react";
import UserBar from "../../components/UserBar/UserBar";
import ChatControl from "../../components/ChatControl/ChatControl";
import ChatList from "../../components/ChatList/ChatList";


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
        this.addMsg();
        this.getReply();
    }

    addMsg = (msg) => {
        this.setState({ msgs: [...this.state.msgs, { type: "sent", msg: this.state.currentMsg }] });
        this.setState({ currentMsg: "" });

        // save chat
        localStorage.setItem("chats", JSON.stringify(this.state.msgs));
    }

    addReply = (reply) => {
        this.setState({ msgs: [...this.state.msgs, { type: "received", msg: reply }] });

        // save chat
        localStorage.setItem("chats", JSON.stringify(this.state.msgs));
    }

    getReply = () => {
        this.setState({
            inputReadOnly: true,
            botStatus: "Typing...",
            inputPlaceHolder: "Wait until she send a reply"
        });
        fetch(`api/${this.state.currentMsg}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.addReply(data.reply);
            })
            .catch(e => {
                this.addReply("Sorry. I didn't quite understand that.");
            }).finally(() => {
                this.setState({
                    inputReadOnly: false,
                    botStatus: "Online",
                    inputPlaceHolder: "Type a message",
                });
            });
    }

    render() {
        return (
            <div className="chat-container">
                <UserBar botStatus={this.state.botStatus} />
                <div className="conversation">
                    <div className="conversation-container">
                        <ChatList chats={this.state.msgs} />
                    </div>
                    <ChatControl sendMsg={this.sendMsg} typeMsg={this.typeMsg} currentMsg={this.state.currentMsg} readOnly={this.state.inputReadOnly} inputPlaceHolder={this.state.inputPlaceHolder} />
                </div>
            </div>
        )
    }
}

export default ChatView;