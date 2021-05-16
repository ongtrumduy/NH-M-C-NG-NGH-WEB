import React from "react";
import Draggable from "react-draggable";
import defaultavatar from "../../../../Main/Image-Icons/default-avatar.png";

export default class TeamMemberChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TeamMemberRoomChatList: [],
      TeamMemberChatContent: ""
    };
  }

  componentDidMount = () => {
    this.props.socket.on("response-room-chat-list", data => {
      if (
        (this.props.MemberID === data.MemberID &&
          this.props.MemberChoiceChatID === data.MemberChatID) ||
        (this.props.MemberID === data.MemberChatID &&
          this.props.MemberChoiceChatID === data.MemberID)
      )
        this.setState({
          TeamMemberRoomChatList: data.RoomChatContent
        });
    });

    this.props.socket.on("update-room-chat-list", data => {
      if (
        (this.props.MemberID === data.MemberID &&
          this.props.MemberChoiceChatID === data.MemberChatID) ||
        (this.props.MemberID === data.MemberChatID &&
          this.props.MemberChoiceChatID === data.MemberID)
      )
        this.setState({
          TeamMemberRoomChatList: data.RoomChatContent
        });
    });
  };

  handleTeamMemberChatContent = event => {
    this.setState({
      TeamMemberChatContent: event.target.value
    });
  };

  sentMessageToTeamMemberChat = () => {
    this.props.socket.emit("sent-message-to-team-member-chat", {
      MemberChatID: this.props.MemberChoiceChatID,
      TeamID: this.props.TeamID,
      MemberID: this.props.MemberID,
      MemberChatContent: this.state.TeamMemberChatContent
    });
    this.setState({
      TeamMemberChatContent: ""
    });
  };

  pressEnterSendMessageContent = event => {
    if (event.key === "Enter") {
      this.sentMessageToTeamMemberChat();
    }
  };

  renderTeamMemberChat = () => {
    return (
      <div>
        <div className="user-team_team-menu-and-content__content___discuss____member-chat______avatar-fullname">
          <div className="user-team_team-menu-and-content__content___discuss____member-chat______avatar-fullname______avatar">
            <img src={defaultavatar} alt="default-avatar" />
          </div>
          <div className="user-team_team-menu-and-content__content___discuss____member-chat______avatar-fullname______fullname">
            <p>{this.props.MemberChoiceChatID}</p>
          </div>
          <div
            onClick={() => this.props.setChooseTeamMemberChat(false)}
            className="user-team_team-menu-and-content__content___discuss____member-chat______avatar-fullname______close-box"
          >
            <i className="material-icons">&#xe5cd;</i>
          </div>
        </div>

        <div className="user-team_team-menu-and-content__content___discuss____member-chat______team-chat-content">
          {!this.state.TeamMemberRoomChatList.length ? (
            <p style={{ fontWeight: "bold", fontSize: "12px" }}>
              Hãy nhắn tin để liên lạc với bạn này
            </p>
          ) : (
            <div>
              {this.state.TeamMemberRoomChatList.map(
                (roomchatitem, roomchatindex) => (
                  <div key={roomchatindex}>
                    <p>{roomchatitem.MemberChatContent}</p>
                  </div>
                )
              )}
            </div>
          )}
        </div>
        <div className="user-team_team-menu-and-content__content___discuss____member-chat______send-message">
          <div>
            <input
              type="text"
              placeholder="Nhập tin nhắn..."
              onChange={event => this.handleTeamMemberChatContent(event)}
              onKeyPress={event => this.pressEnterSendMessageContent(event)}
              value={this.state.TeamMemberChatContent}
            />
          </div>
          <div onClick={() => this.sentMessageToTeamMemberChat()}>
            <i className="material-icons">&#xe163;</i>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <Draggable bounds={{ top: -300, left: 0, right: 600, bottom: 0 }}>
        <div
          style={
            this.props.chooseTeamMemberChat
              ? { display: "block" }
              : { display: "none" }
          }
          className="user-team_team-menu-and-content__content___discuss____member-chat"
        >
          {this.renderTeamMemberChat()}
        </div>
      </Draggable>
    );
  }
}
