import React from "react";
import TeamDiscussCommentContentItem from "./TeamDiscussCommentContentItem";

export default class TeamDiscussContentReplyInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MemberComment: ""
    };
  }

  handleCreateNewMemberComment = event => {
    this.setState({
      MemberComment: event.target.value
    });
  };

  sentNewDiscussCommentCreate = () => {
    this.props.socket.emit("create-new-discuss-comment", {
      MemberID: this.props.MemberID,
      MemberDiscussID: this.props.MemberDiscussID,
      TeamDiscussID: this.props.TeamDiscussID,
      TeamID: this.props.TeamID,
      MemberComment: this.state.MemberComment
    });
  };

  pressEnterNewDiscussComment = event => {
    if (event.key === "Enter") {
      this.sentNewDiscussCommentCreate();
      this.setState({
        MemberComment: ""
      });
    }
  };

  render() {
    return (
      <div className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________discussreplyinput">
        {this.props.TeamCommentContent.map((commentitem, commemtindex) => (
          <div key={commemtindex}>
            <TeamDiscussCommentContentItem
              MemberCommentID={commentitem.MemberCommentID}
              MemberCommentTime={commentitem.MemberCommentTime}
              MemberCommentContent={commentitem.MemberCommentContent}
              MemberCommentFullName={commentitem.MemberCommentFullName}
              setChoiceTeamMemberChatID={this.props.setChoiceTeamMemberChatID}
            />
          </div>
        ))}
        <div className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________discussreplyinput_________send">
          <div>
            <input
              type="text"
              onChange={event => this.handleCreateNewMemberComment(event)}
              onKeyPress={this.pressEnterNewDiscussComment}
              value={this.state.MemberComment}
              placeholder="Trả lời"
            />
          </div>
          <div onClick={() => this.sentNewDiscussCommentCreate()}>
            <i className="material-icons">&#xe163;</i>
          </div>
        </div>
      </div>
    );
  }
}
