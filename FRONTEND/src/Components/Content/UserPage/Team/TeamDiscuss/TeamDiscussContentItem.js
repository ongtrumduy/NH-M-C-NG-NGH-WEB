import React from "react";
import defaultavatar from "../../../../Main/Image-Icons/default-avatar.png";
import TeamDiscussContentReplyInput from "./TeamDiscussContentReplyInput";

export default class TeamDiscussContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { setDiscussReply: false, TeamDisscussChooseCommentID: "" };
  }

  handleSetDiscussReply = () => {
    this.setState({
      setDiscussReply: true
    });
  };

  componentDidMount = () => {
    this.props.socket.on("update-team-discuss-comment-content", data => {
      if (this.props.TeamDiscussID === data.TeamDiscussID) {
        this.setState({
          TeamDisscussChooseCommentID: data.TeamDiscussID
        });
      }
    });
  };

  renderContentDiscussReply = () => {
    if (
      this.state.setDiscussReply ||
      this.props.TeamDiscussID === this.state.TeamDisscussChooseCommentID
    ) {
      return (
        <TeamDiscussContentReplyInput
          MemberDiscussID={this.props.MemberDiscussID}
          TeamDiscussID={this.props.TeamDiscussID}
          MemberID={this.props.MemberID}
          TeamID={this.props.TeamID}
          TeamCommentContent={this.props.TeamCommentContent}
          socket={this.props.socket}
          setChoiceTeamMemberChatID={this.props.setChoiceTeamMemberChatID}
        />
      );
    } else {
      return (
        <div>
          <div
            className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________reply"
            onClick={() => this.handleSetDiscussReply()}
          >
            <div>
              <i className="material-icons">&#xe15e;</i>
            </div>
            <div>
              <span>Xem bình luận</span>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss">
        <div className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______avatar">
          <img alt="default-avatar" src={defaultavatar} />
        </div>
        <div className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox">
          <div className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________nameandtime">
            <div
              onClick={() =>
                this.props.setChoiceTeamMemberChatID(this.props.MemberDiscussID)
              }
              className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________nameandtime_________fullname"
            >
              {this.props.MemberDiscussFullName}-{this.props.MemberDiscussID}
            </div>
            <div className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________nameandtime_________timedate">
              {this.props.MemberDiscussTime}
            </div>
          </div>
          <div className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________content">
            <p>{this.props.MemberDiscussContent}</p>
          </div>
          {this.renderContentDiscussReply()}
        </div>
      </div>
    );
  }
}
