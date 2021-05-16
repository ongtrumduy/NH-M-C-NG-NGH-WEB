import React from "react";
import Daggable from "./Components/Draggable";

import Videos from "./Components/Videos";
import Video from "./Components/Video";

export default class VideoTeamCallMain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      localStream: null,
      remoteStream: null,

      remoteStreams: [],
      peerConnections: {},
      selectedVideo: null,

      status: "Please wait...",

      pc_config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun01.sipphone.com" },
          { urls: "stun:stun.ekiga.net" },
          { urls: "stun:stun.fwdnet.net" },
          { urls: "stun:stun.ideasip.com" },
          { urls: "stun:stun.iptel.org" },
          { urls: "stun:stun.rixtelecom.se" },
          { urls: "stun:stun.schlund.de" },
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
          { urls: "stun:stun2.l.google.com:19302" },
          { urls: "stun:stun3.l.google.com:19302" },
          { urls: "stun:stun4.l.google.com:19302" },
          { urls: "stun:stunserver.org" },
          { urls: "stun:stun.softjoys.com" },
          { urls: "stun:stun.voiparound.com" },
          { urls: "stun:stun.voipbuster.com" },
          { urls: "stun:stun.voipstunt.com" },
          { urls: "stun:stun.voxgratia.org" },
          { urls: "stun:stun.xten.com" },
          {
            urls: "turn:numb.viagenie.ca",
            credential: "muazkh",
            username: "webrtc@live.com"
          },
          {
            urls: "turn:192.158.29.39:3478?transport=udp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808"
          },
          {
            urls: "turn:192.158.29.39:3478?transport=tcp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808"
          },
          {
            urls: "turn:192.158.29.39:3478?transport=udp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808"
          },
          {
            urls: "turn:192.158.29.39:3478?transport=tcp",
            credential: "JZEOEt2V3Qb0y27GRntt2u2PAYA=",
            username: "28224511:1379330808"
          },
          {
            urls: ["turn:13.250.13.83:3478?transport=udp"],
            username: "YzYNCouZM1mhqhmseWk6",
            credential: "YzYNCouZM1mhqhmseWk6"
          },
          {
            urls: "turn:turn.bistri.com:80",
            credential: "homeo",
            username: "homeo"
          },
          {
            urls: "turn:turn.anyfirewall.com:443?transport=tcp",
            credential: "webrtc",
            username: "webrtc"
          }
        ]
      },

      sdpConstraints: {
        mandatory: {
          OfferToReceiveAudio: true,
          OfferToReceiveVideo: true
        }
      }
    };
  }

  getLocalStream = () => {
    const success = stream => {
      window.localStream = stream;
      this.setState({
        localStream: stream
      });

      this.props.socket.emit("online-call-peer-members", {
        TeamID: this.props.TeamID,
        LocalMemberID: this.props.MemberID,
        LocalMemberSocketID: this.props.socket.id
      });
    };

    const failure = e => {
      console.log("getUserMedia Error: ", e);
    };

    const constraints = {
      video: true,
      audio: { echoCancellation: true },
      options: {
        mirror: true
      }
    };

    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      success(stream);
    })().catch(failure);
  };

  createPeerConnection = async (
    RemoteMemberID,
    RemoteMemberSocketID,
    callback
  ) => {
    try {
      let pc = new RTCPeerConnection(this.state.pc_config);

      const peerConnections = {
        ...this.state.peerConnections,
        [RemoteMemberID]: pc
      };
      this.setState({
        peerConnections
      });

      pc.onicecandidate = e => {
        if (e.candidate) {
          this.props.socket.emit("set-candidate-to-connect", {
            CandidateConnect: e.candidate,
            LocalMemberID: this.props.MemberID,
            LocalMemberSocketID: this.props.socket.id,
            RemoteMemberID: RemoteMemberID,
            RemoteMemberSocketID: RemoteMemberSocketID
          });
        }
      };

      pc.ontrack = e => {
        let _remoteStream = null;
        let remoteStreams = this.state.remoteStreams;
        let remoteVideo = {};

        const rVideos = this.state.remoteStreams.filter(
          stream => stream.id === RemoteMemberID
        );

        if (rVideos.length) {
          _remoteStream = rVideos[0].stream;
          _remoteStream.addTrack(e.track, _remoteStream);
          remoteVideo = {
            ...rVideos[0],
            stream: _remoteStream
          };
          remoteStreams = this.state.remoteStreams.map(_remoteVideo => {
            return (
              (_remoteVideo.id === remoteVideo.id && remoteVideo) ||
              _remoteVideo
            );
          });
        } else {
          _remoteStream = new MediaStream();
          _remoteStream.addTrack(e.track, _remoteStream);

          remoteVideo = {
            id: RemoteMemberID,
            name: RemoteMemberID,
            stream: _remoteStream
          };

          remoteStreams = [...this.state.remoteStreams, remoteVideo];
        }

        this.setState(prevState => {
          const remoteStream =
            prevState.remoteStreams.length > 0
              ? {}
              : { remoteStream: _remoteStream };

          let selectedVideo = prevState.remoteStreams.filter(
            stream => stream.id === prevState.selectedVideo.id
          );
          selectedVideo = selectedVideo.length
            ? {}
            : { selectedVideo: remoteVideo };

          return {
            ...selectedVideo,
            ...remoteStream,
            remoteStreams
          };
        });
      };

      pc.close = () => {};

      if (this.state.localStream) {
        this.state.localStream.getTracks().forEach(track => {
          pc.addTrack(track, this.state.localStream);
        });
      }

      callback(pc);
    } catch (e) {
      console.log("Something went wrong! pc not created!!", e);
      callback(null);
    }
  };

  componentDidMount = () => {
    this.connectCallSuccess();
    this.peerMemberCallDisconnect();
    this.connectAllMemberCall();
    this.offerForConnectTeamCall();
    this.answerForConnectTeamCall();
    this.getCandidateForConnect();
    this.reconnectWhenHaveErrorConnect();
    this.removeErrorPeerConnection();
  };

  connectCallSuccess = async () => {
    await this.props.socket.on("connection-call-success", data => {
      console.log("Đã kết nối !!!!");
      this.getLocalStream();

      const status =
        data.peerCount > 1
          ? `Total Connected Peers: ${data.MemberPeerCount}`
          : "Waiting for other peers to connect";

      this.setState({
        status: status
      });
    });
  };

  peerMemberCallDisconnect = async () => {
    this.props.socket.on("peer-member-call-disconnected", data => {
      const remoteStreams = this.state.remoteStreams.filter(
        stream => stream.id !== data.RemoteMemberID
      );

      this.setState(prevState => {
        const selectedVideo =
          prevState.selectedVideo.id === data.RemoteMemberID &&
          remoteStreams.length
            ? { selectedVideo: remoteStreams[0] }
            : null;

        return {
          remoteStreams,
          ...selectedVideo
        };
      });
    });
  };

  connectAllMemberCall = async () => {
    await this.props.socket.on("connect-all-member-call", data => {
      this.createPeerConnection(
        data.RemoteMemberID,
        data.RemoteMemberSocketID,
        async pc => {
          if (pc) {
            await pc.createOffer(this.state.sdpConstraints).then(async sdp => {
              await pc.setLocalDescription(sdp);

              this.props.socket.emit("offer-to-connect-team-call", {
                SDPOfferConnect: sdp,
                LocalMemberID: this.props.MemberID,
                LocalMemberSocketID: this.props.socket.id,
                RemoteMemberID: data.RemoteMemberID,
                RemoteMemberSocketID: data.RemoteMemberSocketID
              });
            });
          }
        }
      );
    });
  };

  offerForConnectTeamCall = async () => {
    await this.props.socket.on("offer-for-connect-team-call", data => {
      // console.log(
      //   "Ra thử offer-for-connect-team-call ",
      //   JSON.stringify(data.SDPOfferConnect)
      // );
      this.createPeerConnection(
        data.RemoteMemberID,
        data.RemoteMemberSocketID,
        async pc => {
          await pc.addStream(this.state.localStream);
          await pc.setRemoteDescription(data.SDPOfferConnect).then(async () => {
            await pc.createAnswer(this.state.sdpConstraints).then(async sdp => {
              await pc.setLocalDescription(sdp);

              this.props.socket.emit("answer-to-connect-team-call", {
                SDPAnswerConnect: sdp,
                LocalMemberID: this.props.MemberID,
                LocalMemberSocketID: this.props.socket.id,
                RemoteMemberID: data.RemoteMemberID,
                RemoteMemberSocketID: data.RemoteMemberSocketID
              });
            });
          });
        }
      );
    });
  };

  answerForConnectTeamCall = async () => {
    await this.props.socket.on("answer-for-connect-team-call", async data => {
      // console.log(
      //   "Ra data của answer-for-connect-team-call",
      //   data.SDPAnswerConnect.type
      // );
      const pc = this.state.peerConnections[data.RemoteMemberID];
      // console.log("Xem pc có gì: ", pc);
      if (pc) {
        await pc
          .setRemoteDescription(data.SDPAnswerConnect)
          .catch(error => console.log(error));
      }
    });
  };

  getCandidateForConnect = async () => {
    await this.props.socket.on("get-candidate-for-connect", async data => {
      // console.log("vào trong get-candidate-for-connect");
      const pc = this.state.peerConnections[data.RemoteMemberID];

      if (pc) {
        await pc
          .addIceCandidate(data.CandidateConnect)
          .catch(error => console.log(error));
      }
    });
  };

  reconnectWhenHaveErrorConnect = () => {};

  removeErrorPeerConnection = () => {};

  switchVideo = _video => {
    this.setState({
      selectedVideo: _video
    });
  };

  render() {
    console.log("xem peerConnections có gì: ", this.state.peerConnections);
    if (this.state.disconnected) {
      this.props.socket.close();
      this.state.localStream.getTracks().forEach(track => track.stop());
      return <div>You have successfully Disconnected</div>;
    }
    const statusText = (
      <div style={{ color: "yellow", padding: 5 }}>{this.state.status}</div>
    );

    return (
      <div>
        <Daggable
          style={{
            zIndex: 101,
            position: "absolute",
            right: 0,
            cursor: "move"
          }}
        >
          <Video
            videoStyle={{
              width: 200
            }}
            frameStyle={{
              width: 200,
              margin: 5,
              borderRadius: 5,
              backgroundColor: "black"
            }}
            showMuteControls={true}
            videoStream={this.state.localStream}
            autoPlay
            muted
          ></Video>
        </Daggable>

        <Video
          videoStyle={{
            zIndex: 1,
            bottom: 0,
            minWidth: "100%",
            height: "320px",
            backgroundColor: "black"
          }}
          videoStream={
            this.state.selectedVideo && this.state.selectedVideo.stream
          }
          autoPlay
        ></Video>
        <br />
        <div
          style={{
            zIndex: 3,
            position: "absolute"
          }}
        >
          <div
            style={{
              margin: 10,
              backgroundColor: "#cdc4ff4f",
              padding: 10,
              borderRadius: 5
            }}
          >
            {statusText}
          </div>
        </div>
        <div>
          <Videos
            switchVideo={this.switchVideo}
            remoteStreams={this.state.remoteStreams}
          ></Videos>
        </div>
        <br />
      </div>
    );
  }
}
