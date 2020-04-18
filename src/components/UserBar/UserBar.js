import React from "react";
import Avatar from "./img/avatar.jpg";

function UserBar(props) {
    return (
        <div className="user-bar">
            <div className="avatar">
                <img src={Avatar} alt="Avatar" />
            </div>
            <div className="name">
                <span>Cirilla</span>
                <span className="status">{props.botStatus}</span>
            </div>
        </div>
    );
}

export default UserBar;