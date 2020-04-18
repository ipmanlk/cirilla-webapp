import React, { useState } from "react";
import UserBar from "../../components/UserBar/UserBar";
import ChatControl from "../../components/ChatControl/ChatControl";
import ChatList from "../../components/ChatList/ChatList";

function ChatView() {
    const [msgs, addMsg] = useState([]);
    const [msg, setMsg] = useState("");
    const [inputReadOnly, setInputReadOnly] = useState(false);
    const [inputPlaceHolder, setInputPlaceHolder] = useState("Type a message");
    const [botStatus, setBotStatus] = useState("Online");

    function sendMsg() {
        addMsg(prevState => ([
            ...prevState,
            { type: "sent", msg: msg }
        ]));
        getReply();
    }

    function getReply() {
        setInputReadOnly(true);
        setBotStatus("Typing...");
        setInputPlaceHolder("Wait until she send a reply");
        fetch(`yourapi/${msg}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setBotStatus("Online");
                addMsg(prevState => ([
                    ...prevState,
                    { type: "received", msg: data.reply }
                ]));
                setInputReadOnly(false);
                setInputPlaceHolder("Type a message");
            })
            .catch(e => {
                setBotStatus("Online");
                addMsg(prevState => ([
                    ...prevState,
                    { type: "received", msg: "Sorry. I didn't quite understand that." }
                ]));
                setInputReadOnly(false);
                setInputPlaceHolder("Type a message");
            });

        setMsg("");
    }

    function typeMsg(e) {
        setMsg(e.target.value);
        if (e.key === 'Enter') {
            sendMsg();
        }
    }

    return (
        <div className="chat-container">
            <UserBar botStatus={botStatus} />
            <div className="conversation">
                <div className="conversation-container">
                    <ChatList chats={msgs} />
                </div>
                <ChatControl sendMsg={sendMsg} typeMsg={typeMsg} currentMsg={msg} readOnly={inputReadOnly} inputPlaceHolder={inputPlaceHolder} />
            </div>
        </div>
    );
}

export default ChatView;