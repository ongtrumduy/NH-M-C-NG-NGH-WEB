import React from "react";
import axios from "axios";

import de111 from "../../../../Main/Image-Icons/de111.PNG";

export default class ExcercisesPrivateList extends React.Component {
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
        <div>
          <img
            style={{
              height: "120px",
              width: "120px",
              margin: "32px 0 0 0"
            }}
            alt="team-logo"
            src={de111}
          />
          <p style={{ fontWeight: "bold" }}>"Test bên private list"</p>
        </div>
      </div>
    );
  }
}
