import React from "react";
import axios from "axios";
import Modal from "react-modal";

import "./TeamDiscuss.css";
import TeamDiscussContent from "./TeamAllDiscussContent";
import TeamDiscussCreateNew from "./TeamDiscussCreateNew";
import TeamMemberChat from "../TeamMemberChat/TeamMemberChat";

export default class TeamDiscuss extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      TeamDiscussContent: [],
      chooseTeamMemberChat: false,
      MemberChoiceChatID: "",
      modalIsOpen: false
    };
  }

  componentDidMount = () => {
    axios
      .post("/getteamlist/getteamdiscuss", {
        TeamID: this.props.TeamID
      })
      .then(res => {
        this.setState({
          TeamDiscussContent: res.data.TeamDiscussContent
        });
      })
      .catch(error => {
        console.log(error);
      });

    this.props.socket.on("update-team-discuss-content", data => {
      if (this.props.TeamID === data.TeamID) {
        this.setState({
          TeamDiscussContent: data.TeamDiscussContent
        });
      }
    });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  setChoiceTeamMemberChatID = memberID => {
    if (this.props.MemberID !== memberID) {
      this.setState({
        MemberChoiceChatID: memberID
      });

      this.setChooseTeamMemberChat(true);

      this.props.socket.emit("get-team-member-chat-list", {
        MemberChatID: memberID,
        TeamID: this.props.TeamID,
        MemberID: this.props.MemberID
      });
    } else {
      this.openModal();
    }
  };

  setChooseTeamMemberChat = chooseTeamMemberChat => {
    this.setState({
      chooseTeamMemberChat: chooseTeamMemberChat
    });
  };

  render() {
    return (
      <div className="user-team_team-menu-and-content__content___discuss">
        <TeamDiscussContent
          MemberID={this.props.MemberID}
          TeamID={this.props.TeamID}
          socket={this.props.socket}
          TeamDiscussContent={this.state.TeamDiscussContent}
          setChoiceTeamMemberChatID={this.setChoiceTeamMemberChatID}
        />
        <TeamMemberChat
          chooseTeamMemberChat={this.state.chooseTeamMemberChat}
          MemberChoiceChatID={this.state.MemberChoiceChatID}
          setChooseTeamMemberChat={this.setChooseTeamMemberChat}
          MemberID={this.props.MemberID}
          TeamID={this.props.TeamID}
          socket={this.props.socket}
        />
        <TeamDiscussCreateNew
          MemberID={this.props.MemberID}
          TeamID={this.props.TeamID}
          socket={this.props.socket}
        />
        <Modal
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#ecf0f1"
            }
          }}
          ariaHideApp={false}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        >
          <div>
            <p style={{ fontWeight: "bold" }}>
              Bạn không thể chọn nhắn tin với bản thân !!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={this.closeModal}
          >
            Đóng
          </button>
        </Modal>
        ;
      </div>
    );
  }
}
