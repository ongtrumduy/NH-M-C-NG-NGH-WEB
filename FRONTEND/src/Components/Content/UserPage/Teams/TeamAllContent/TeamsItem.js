import React from "react";

export default class TeamsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div onClick={() => this.props.chooseOneJoinedTeam(this.props.TeamID)}>
        <img
          style={{
            height: "120px",
            width: "120px",
            margin: "32px 0 0 0"
          }}
          alt="team-logo"
          src={this.props.TeamLogo}
        />
        <p style={{ fontWeight: "bold" }}>{this.props.TeamName}</p>
      </div>
    );
  }
}
