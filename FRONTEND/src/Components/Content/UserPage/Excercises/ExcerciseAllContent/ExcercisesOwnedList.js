import React from "react";
import axios from "axios";

export default class ExcercisesOwnedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { AllExcercisePublicList: [] };
  }

  componentDidMount = () => {
    axios
      .post("/getExcercisepublixclist", {
        MemberID: this.props.MemberID
      })
      .then(res => {
        // console.log(res.data);
        this.setState({
          AllExcercisePublicList: res.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  chooseOneJoinedExcercise = ExcerciseID => {
    this.props.getExcerciseIDMemberChoice(ExcerciseID);
    this.props.updateRenderTeamControl("Excercisecontent");
  };

  render() {
    return (
      <div className="user-teams_all__list">
        {/* {this.state.AllExcercisePublicList.map((Excerciseitem, teamindex) =>
          teamitem.TeamInfor.map(teamnameitem => (
            <TeamsItem
              key={teamindex}
              TeamID={Excerciseitem.TeamID}
              TeamLogo={Excerciseitem.TeamLogo}
              TeamName={Excerciseitem.TeamName}
              chooseOneJoinedTeam={this.chooseOneJoinedTeam}
            />
          ))
        )} */}
        <p>Đây là giao diện Owned</p>
      </div>
    );
  }
}
