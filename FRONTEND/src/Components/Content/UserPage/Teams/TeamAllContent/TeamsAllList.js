import React from "react";
import axios from "axios";

import TeamsItem from "./TeamsItem";

export default class TeamsAllList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { AllTeamList: [] };
  }

  componentDidMount = () => {
    // axios
    //   .post("/getteamlist", {
    //     MemberID: this.props.MemberID
    //   })
    //   .then(res => {
    //     // console.log(res.data);
    //     this.setState({
    //       AllTeamList: res.data
    //     });
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  chooseOneJoinedTeam = TeamID => {
    this.props.getTeamIDMemberChoice(TeamID);
    this.props.updateRenderTeamControl("teamcontent");
  };

  render() {
    return (
      <div className="user-teams_all__list">
        {this.state.AllTeamList.map((teamitem, teamindex) =>
          teamitem.TeamInfor.map(teamnameitem => (
            <TeamsItem
              key={teamindex}
              TeamID={teamitem.TeamID}
              TeamLogo={teamnameitem.TeamLogo}
              TeamName={teamnameitem.TeamName}
              chooseOneJoinedTeam={this.chooseOneJoinedTeam}
            />
          ))
        )}
      </div>
    );
  }
}
