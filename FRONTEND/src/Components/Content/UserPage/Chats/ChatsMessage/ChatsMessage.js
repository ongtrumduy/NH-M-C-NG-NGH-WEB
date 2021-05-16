import React from "react";
import ChatsMessageContent from "./ChatsMessageContent";
import ChatsMessageSend from "./ChatsMessageSend";

export default class ChatsMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-chat_content__message">
        <ChatsMessageContent
          MemberID={this.props.MemberID}
          MemberMessageID={this.props.MemberMessageID}
          ChatMessageContent={this.props.ChatMessageContent}
          socket={this.props.socket}
        />
        <ChatsMessageSend
          MemberID={this.props.MemberID}
          MemberMessageID={this.props.MemberMessageID}
          socket={this.props.socket}
        />
      </div>
    );
  }
}
