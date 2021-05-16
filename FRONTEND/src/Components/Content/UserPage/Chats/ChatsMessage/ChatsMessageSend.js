import React from "react";

export default class ChatsMessageSend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MemberMessage: ""
    };
  }

  handleNewMessage = event => {
    this.setState({
      MemberMessage: event.target.value
    });
  };

  sentNewMessageChat = () => {
    this.props.socket.emit("create-new-message-chat", {
      MemberID: this.props.MemberID,
      MemberMessageID: this.props.MemberMessageID,
      MemberMessage: this.state.MemberMessage
    });
  };

  pressEnterNewMessage = event => {
    if (event.key === "Enter") {
      this.sentNewMessageChat();
      this.setState({
        MemberMessage: ""
      });
    }
  };

  render() {
    return (
      <div className="user-chat_content__message___chat-send">
        <div>
          <input
            type="text"
            placeholder="Nhập tin nhắn"
            onChange={event => this.handleNewMessage(event)}
            onKeyPress={() => this.pressEnterNewMessage()}
          />
        </div>
        <div onClick={() => this.sentNewMessageChat()}>
          <i className="material-icons">&#xe163;</i>
        </div>
      </div>
    );
  }
}
