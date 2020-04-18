import React from "react";

function ChatControl(props) {
    return (
        <div className="conversation-compose">
            <div className="space">
            </div>
            <input className="input-msg" name="input" placeholder={props.inputPlaceHolder} autoFocus onKeyUp={props.typeMsg} onChange={props.typeMsg} value={props.currentMsg} readOnly={props.readOnly}></input>
            <div className="photo">
            </div>
            <button className="send" onClick={props.sendMsg}>
                <div className="circle">
                    <i className="zmdi zmdi-mail-send"></i>
                </div>
            </button>
        </div>
    );
}

export default ChatControl;