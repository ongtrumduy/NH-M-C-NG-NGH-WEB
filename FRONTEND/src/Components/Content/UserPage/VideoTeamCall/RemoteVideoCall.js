import React from "react";

export default class RemoteVideoCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MemberCallMic: true,
      MemberCallCamera: true
    };
  }

  componentDidMount = () => {
    if (this.props.RemoteVideoStream) {
      this.video.srcObject = this.props.RemoteVideoStream;
    }
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.RemoteVideoStream &&
      nextProps.RemoteVideoStream !== this.props.RemoteVideoStream
    ) {
      this.video.srcObject = nextProps.RemoteVideoStream;
    }
  }

  setMuteMemberMic = event => {
    const remotememberstream = this.video.srcObject
      .getTracks()
      .filter(membertrack => membertrack.kind === "audio");

    this.setState(prevState => {
      if (remotememberstream) {
        remotememberstream[0].enabled = !prevState.MemberCallMic;
      }
      return { MemberCallMic: !prevState.MemberCallMic };
    });
  };

  setMuteMemberCamera = event => {
    const remotememberstream = this.video.srcObject
      .getTracks()
      .filter(membertrack => membertrack.kind === "video");

    this.setState(prevState => {
      if (remotememberstream) {
        remotememberstream[0].enabled = !prevState.MemberCallCamera;
      }
      return { MemberCallCamera: !prevState.MemberCallCamera };
    });
  };

  renderButtonMuteControl = () => {
    if (this.props.showMuteControls) {
      return (
        <div>
          <i
            className="material-icons"
            onClick={this.setMuteMemberMic}
            style={{
              cursor: "pointer",
              padding: 5,
              fontSize: 20,
              color: (this.state.MemberCallMic && "white") || "red"
            }}
          >
            {(this.state.MemberCallMic && "mic") || "mic_off"}
          </i>
          <i
            className="material-icons"
            onClick={this.setMuteMemberCamera}
            style={{
              cursor: "pointer",
              padding: 5,
              fontSize: 20,
              color: (this.state.MemberCallCamera && "white") || "red"
            }}
          >
            {(this.state.MemberCallCamera && "videocam") || "videocam_off"}
          </i>
        </div>
      );
    }
  };

  render() {
    return (
      <div
        style={{
          width: 120,
          float: "left",
          padding: "0 3px"
        }}
      >
        <video
          style={{
            cursor: "pointer",
            objectFit: "cover",
            borderRadius: 3,
            width: "100%"
          }}
          muted={this.props.muted}
          autoPlay
          ref={ref => {
            this.video = ref;
          }}
        ></video>
        {this.renderButtonMuteControl()}
      </div>
    );
  }
}
