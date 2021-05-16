import React from "react";

export default class ChatsMessageItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div
        className={
          this.props.userid === this.props.userchatid
            ? "user-chat_content__message___content____member-right-message"
            : "user-chat_content__message___content____member-left-message"
        }
      >
        <div className="user-chat_content__message___content____member-message_____message-item">
          <p>&nbsp;&nbsp;{this.props.MessageContent}&nbsp;&nbsp;</p>
          <p>{this.props.MessageDate}</p>
        </div>
      </div>
    );
  }
}
