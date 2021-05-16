import React from "react";
import TeamDiscussContentItem from "./TeamDiscussContentItem";

export default class TeamAllDiscussContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderTeamDiscussContent = teamitem => {
    switch (teamitem.TeamDiscussType) {
      case "non-activitied":
        return (
          <p style={{ fontWeight: "bold" }}>{teamitem.MemberDiscussContent}</p>
        );
      case "discuss":
        return (
          <TeamDiscussContentItem
            MemberDiscussID={teamitem.MemberDiscussID}
            MemberID={this.props.MemberID}
            TeamDiscussID={teamitem.TeamDiscussID}
            MemberDiscussFullName={teamitem.MemberDiscussFullName}
            TeamID={this.props.TeamID}
            MemberDiscussContent={teamitem.MemberDiscussContent}
            MemberDiscussTime={teamitem.MemberDiscussTime}
            TeamCommentContent={teamitem.TeamCommentContent}
            socket={this.props.socket}
            setChoiceTeamMemberChatID={this.props.setChoiceTeamMemberChatID}
          />
        );
      default:
    }
  };

  render() {
    return (
      <div className="user-team_team-menu-and-content__content___discuss_____alldiscuss">
        {this.props.TeamDiscussContent.map((teamitem, teamindex) => (
          <div key={teamindex}>{this.renderTeamDiscussContent(teamitem)}</div>
        ))}
      </div>
    );
  }
}
