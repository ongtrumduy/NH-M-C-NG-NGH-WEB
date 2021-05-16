import React from "react";
import "./Teams.css";
import TeamsAddCodeTeam from "./TeamAAndCTeam/TeamsAddCodeTeam";
import TeamsAllContent from "./TeamAllContent/TeamsAllContent";
import TeamsCreateTeam from "./TeamAAndCTeam/TeamsCreateTeam";
import Team from "../Team/Team";
import VideoCall from "../VideoTeamCall/VideoTeamCall";

export default class Teams extends React.Component {
  constructor(props) {
    super(props);
    this.state = { setTeamRender: "teamall", TeamID: "" };
  }

  updateRenderTeamControl = state => {
    this.setState({
      setTeamRender: state
    });
  };

  getTeamIDMemberChoice = teamID => {
    this.setState({
      TeamID: teamID
    });
  };

  renderTeamControlContent = () => {
    switch (this.state.setTeamRender) {
      case "create":
        return (
          <TeamsCreateTeam
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderTeamControl={this.updateRenderTeamControl}
          />
        );
      case "addcode":
        return (
          <TeamsAddCodeTeam
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderTeamControl={this.updateRenderTeamControl}
          />
        );
      case "teamcontent":
        return (
          <Team
            MemberID={this.props.MemberID}
            TeamID={this.state.TeamID}
            socket={this.props.socket}
            updateRenderTeamControl={this.updateRenderTeamControl}
          />
        );
      case "teamall":
        return (
          <TeamsAllContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderTeamControl={this.updateRenderTeamControl}
            getTeamIDMemberChoice={this.getTeamIDMemberChoice}
          />
        );
      case "videocall":
        return (
          <VideoCall
            MemberID={this.props.MemberID}
            TeamID={this.state.TeamID}
            socket={this.props.socket}
            updateRenderTeamControl={this.updateRenderTeamControl}
          />
        );
      default:
        return (
          <TeamsAllContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderTeamControl={this.updateRenderTeamControl}
            getTeamIDMemberChoice={this.getTeamIDMemberChoice}
          />
        );
    }
  };

  render() {
    return <div className="user-teams">{this.renderTeamControlContent()}</div>;
  }
}
