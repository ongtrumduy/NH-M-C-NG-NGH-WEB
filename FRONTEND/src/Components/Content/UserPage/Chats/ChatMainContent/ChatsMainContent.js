import React from "react";
import axios from "axios";
import ChatMainMenu from "./ChatMainMenu";

import ChatsMessage from "../ChatsMessage/ChatsMessage";
import ChatsNotes from "../ChatsNotes/ChatsNotes";
import ChatsSetting from "../ChatsSetting/ChatsSetting";
import ChatsFiles from "../ChatsFiles/ChatsFiles";

export default class ChatsMainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ChatMessageContent: [],
      setSelectChatContent: "message"
    };
  }

  componentDidMount = () => {
    axios
      .post("/getchatmessage", {
        MemberID: this.props.MemberID,
        MemberMessageID: this.props.MemberMessageID
      })
      .then(res => {
        this.setState({
          ChatMessageContent: res.data.ChatMessageContent
        });
      })
      .catch(error => {
        console.log(error);
      });

    this.props.socket.on("update-chat-message-content", data => {
      if (
        this.props.MemberID === data.MemberID &&
        this.props.MemberMessageID === data.MemberMessageID
      ) {
        this.setState({
          ChatMessageContent: data.ChatMessageContent
        });
      } else if (
        this.props.MemberID === data.MemberMessageID &&
        this.props.MemberMessageID === data.MemberID
      ) {
        this.setState({
          ChatMessageContent: data.ChatMessageContent
        });
      }
    });
  };

  setSelectChatContentClickChoose = setSelect => {
    this.setState({
      setSelectChatContent: setSelect
    });
  };

  renderChatMainChooseContent = setSelectChatContent => {
    switch (setSelectChatContent) {
      case "message":
        return (
          <ChatMessage
            MemberID={this.props.MemberID}
            MemberMessageID={this.props.MemberMessageID}
            socket={this.props.socket}
          />
        );
      case "files":
        return (
          <ChatFiles
            MemberID={this.props.MemberID}
            MemberMessageID={this.props.MemberMessageID}
            socket={this.props.socket}
          />
        );
      case "setting":
        return (
          <ChatSetting
            MemberID={this.props.MemberID}
            MemberMessageID={this.props.MemberMessageID}
            socket={this.props.socket}
          />
        );
      case "notes":
        return (
          <ChatNotes
            MemberID={this.props.MemberID}
            MemberMessageID={this.props.MemberMessageID}
            socket={this.props.socket}
          />
        );
    }
  };

  render() {
    return (
      <div className="user-chat_content">
        <ChatMainMenu
          MemberID={this.props.MemberID}
          socket={this.props.socket}
          setSelectChatContentClickChoose={this.setSelectChatContentClickChoose}
        />
        {this.renderChatMainChooseContent(this.state.setSelectChatContent)}
      </div>
    );
  }
}
