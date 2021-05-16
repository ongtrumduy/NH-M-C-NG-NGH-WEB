import React from "react";

export default class SelectedVideoCall extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      MemberCallMic: true,
      MemberCallCamera: true
    };
  }

  componentDidMount = () => {
    if (this.props.SelectedMemberVideo) {
      this.video.srcObject = this.props.SelectedMemberVideo;
    }
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.SelectedMemberVideo &&
      nextProps.SelectedMemberVideo !== this.props.SelectedMemberVideo
    ) {
      this.video.srcObject = nextProps.SelectedMemberVideo;
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
      <div>
        <video
          style={{
            zIndex: 1,
            // position: "fixed",
            bottom: 0,
            minWidth: "100%",
            // minHeight: "100%",
            height: "200px",
            backgroundColor: "black"
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
