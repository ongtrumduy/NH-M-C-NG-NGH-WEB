import React from "react";
import LocalVideoCall from "./LocalVideoCall";
import AllVideoCalls from "./AllVideoCalls";
import SelectedVideoCall from "./SelectedVideoCall";

export default class VideoTeamCallContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>
          <LocalVideoCall
            showMuteControls={true}
            LocalMemberStream={this.props.LocalMemberStream}
            autoplay
            muted
          />
          <SelectedVideoCall
            SelectedMemberStream={
              this.props.SelectedMemberVideo &&
              this.props.SelectedMemberVideo.RemoteMemberStream
            }
            autoplay
          />
        </div>
        <div>
          <AllVideoCalls
            switchMemberVideoCall={this.props.switchMemberVideoCall}
            AllRemoteMemberStreams={this.props.AllRemoteMemberStreams}
          />
        </div>
      </div>
    );
  }
}
