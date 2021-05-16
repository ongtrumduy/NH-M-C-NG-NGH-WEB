import React from "react";
import axios from "axios";

import TeamMainName from "./TeamMainContent/TeamMainName";
import TeamMainMenu from "./TeamMainContent/TeamMainMenu";
import TeamMainContent from "./TeamMainContent/TeamMainContent";
import "./Team.css";

export default class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ChooseTeamInfor: [], setSelectTeamContent: "discuss" };
  }

  componentDidMount = () => {
    axios
      .post("/getteamlist/getteaminfor", {
        TeamID: this.props.TeamID
      })
      .then(res => {
        this.setState({
          ChooseTeamID: res.data.TeamID,
          ChooseTeamInfor: res.data.TeamInfor
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  setSelectTeamContentClickChoose = setSelect => {
    this.setState({
      setSelectTeamContent: setSelect
    });
  };

  render() {
    return (
      <div className="user-team">
        <div className="user-team_team-name">
          <div
            className="user-team_team-name__backtoteamall"
            onClick={() => this.props.updateRenderTeamControl("teamall")}
          >
            <div>
              <i className="material-icons"> &#xe5c4;</i>
            </div>
            <div>
              <span>Tất cả các nhóm</span>
            </div>
          </div>
          <TeamMainName
            MemberID={this.props.MemberID}
            TeamID={this.state.ChooseTeamID}
            ChooseTeamInfor={this.state.ChooseTeamInfor}
          />
        </div>
        <div className="user-team_team-menu-and-content">
          <div>
            <TeamMainMenu
              MemberID={this.props.MemberID}
              TeamID={this.state.ChooseTeamID}
              socket={this.props.socket}
              ChooseTeamInfor={this.state.ChooseTeamInfor}
              setSelectTeamContentClickChoose={
                this.setSelectTeamContentClickChoose
              }
              updateRenderTeamControl={this.props.updateRenderTeamControl}
            />
          </div>
          <div>
            <TeamMainContent
              MemberID={this.props.MemberID}
              TeamID={this.props.TeamID}
              socket={this.props.socket}
              ChooseTeamInfor={this.state.ChooseTeamInfor}
              setSelectTeamContent={this.state.setSelectTeamContent}
            />
          </div>
        </div>
      </div>
    );
  }
}
