import React from "react";
import ChatsListContent from "./ChatsListContent";

export default class ChatsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-chat_list">
        <div className="user-chat_list__title">
          <p
            style={{
              fontWeight: "bold",
              fontSize: "16px"
            }}
          >
            Trò chuyện
          </p>
        </div>
        <ChatsListContent />
      </div>
    );
  }
}
