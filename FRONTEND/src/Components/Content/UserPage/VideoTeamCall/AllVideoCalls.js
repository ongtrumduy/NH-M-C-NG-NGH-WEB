import React from "react";
import RemoteVideoCall from "./RemoteVideoCall";

export default class AllVideoCalls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AllRemoteMemberVideos: [],
      AllRemoteMemberStreams: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.AllRemoteMemberStreams !== nextProps.AllRemoteMemberStreams
    ) {
      let remoteMemberVideos = nextProps.AllRemoteMemberStreams.map(
        (remotestream, streamindex) => {
          const videoTrack = remotestream.RemoteMemberStream.getTracks().filter(
            membertrack => membertrack.kind === "video"
          );

          if (videoTrack) {
            return (
              <RemoteVideoCall
                RemoteMemberStream={remotestream.RemoteMemberStream}
                autoplay
                key={streamindex}
              />
            );
          } else {
            return <div></div>;
          }
        }
      );

      this.setState({
        AllRemoteMemberStreams: nextProps.AllRemoteMemberStreams,
        AllRemoteMemberVideos: remoteMemberVideos
      });
    }
  }

  render() {
    return (
      <div
        style={{
          zIndex: 3,
          position: "fixed",
          padding: "6px 3px",
          backgroundColor: "rgba(0,0,0,0.3)",
          maxHeight: 120,
          top: "auto",
          right: 10,
          left: 10,
          bottom: 10,
          overflowX: "scroll",
          whiteSpace: "nowrap"
        }}
      >
        {this.state.AllRemoteMemberVideos}
      </div>
    );
  }
}
