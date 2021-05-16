import React from "react";
import ChatList from "./ChatsList/ChatsList";
import ChatMainContent from "./ChatsMainContent/ChatsMainContent";
import "./Chats.css";

export default class Chats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-chat">
        <ChatList MemberID={this.props.MemberID} socket={this.props.socket} />
        <ChatMainContent
          MemberID={this.props.MemberID}
          socket={this.props.socket}
        />
      </div>
    );
  }
}
