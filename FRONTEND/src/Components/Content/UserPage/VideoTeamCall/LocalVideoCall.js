import React from "react";

export default class LocalVideoCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MemberCallMic: true,
      MemberCallCamera: true
    };
  }

  componentDidMount = () => {
    if (this.props.LocalMemberStream) {
      this.video.srcObject = this.props.LocalMemberStream;
    }
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.LocalMemberStream &&
      nextProps.LocalMemberStream !== this.props.LocalMemberStream
    ) {
      this.video.srcObject = nextProps.LocalMemberStream;
    }
  }

  setMuteMemberMic = event => {
    const localmemberstream = this.video.srcObject
      .getTracks()
      .filter(membertrack => membertrack.kind === "audio");

    this.setState(prevState => {
      if (localmemberstream) {
        localmemberstream[0].enabled = !prevState.MemberCallMic;
      }
      return { MemberCallMic: !prevState.MemberCallMic };
    });
  };

  setMuteMemberCamera = event => {
    const localmemberstream = this.video.srcObject
      .getTracks()
      .filter(membertrack => membertrack.kind === "video");

    this.setState(prevState => {
      if (localmemberstream) {
        localmemberstream[0].enabled = !prevState.MemberCallCamera;
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
          width: 200,
          margin: 5,
          borderRadius: 5,
          backgroundColor: "black"
        }}
      >
        <video
          style={{ width: 200 }}
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
