import React from "react";
// import ChatsMessageItem from "./ChatsMessageItem";

export default class ChatsMessageContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-chat_content__message___content">
        {/* {this.props.ChatMessageContent.map((membermessageitem, memberindex) => (
          <div key={memberindex}>
            <ChatsMessageItem
              MemberMessageID={membermessageitem.MemberID}
              MemberID={this.props.MemberID}
              MessageDate={membermessageitem.MessageDate}
              MessageContent={membermessageitem.MessageContent}
            />
          </div>
        ))} */}
      </div>
    );
  }
}
