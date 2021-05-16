import React from "react";
import VideoTeamCallMain3 from "./VideoTeamCallMain3";

export default class VideoTeamCall extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <div>
        <VideoTeamCallMain3
          MemberID={this.props.MemberID}
          TeamID={this.props.TeamID}
          socket={this.props.socket}
          updateRenderTeamControl={this.updateRenderTeamControl}
        />
      </div>
    );
  }
}
