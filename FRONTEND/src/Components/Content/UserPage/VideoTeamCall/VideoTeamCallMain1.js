import React, { Component } from "react";
import Chat from "./Components/Chat";
import Daggable from "./Components/Draggable";
import Videos from "./Components/Videos";
import Video from "./Components/Video";

export default class VideoTeamCallMain extends Component {
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
          {
            urls: "stun:stun.l.google.com:19302"
          }
        ]
      },

      sdpConstraints: {
        mandatory: {
          OfferToReceiveAudio: true,
          OfferToReceiveVideo: true
        }
      },

      messages: [],
      sendChannels: []
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

    // navigator.mediaDevices
    //   .getDisplayMedia(constraints)
    //   .then(success)
    //   .catch(failure);

    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      // const stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      // success(screenTrack);
      // console.log("stream đó là: ", stream);
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
            // remoteStreams: [...prevState.remoteStreams, remoteVideo]
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
    this.props.socket.on("connection-call-success", data => {
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

    this.props.socket.on("connect-all-member-call", data => {
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

    this.props.socket.on("offer-for-connect-team-call", data => {
      // console.log(
      //   "Ra thử offer-for-connect-team-call ",
      //   JSON.stringify(data.SDPOfferConnect)
      // );
      this.createPeerConnection(
        data.RemoteMemberID,
        data.RemoteMemberSocketID,
        async pc => {
          await pc.addStream(this.state.localStream);
          await pc
            .setRemoteDescription(
              new RTCSessionDescription(data.SDPOfferConnect)
            )
            .then(async () => {
              await pc
                .createAnswer(this.state.sdpConstraints)
                .then(async sdp => {
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

    this.props.socket.on("answer-for-connect-team-call", async data => {
      // console.log(
      //   "Ra data của answer-for-connect-team-call",
      //   data.SDPAnswerConnect.type
      // );
      const pc = this.state.peerConnections[data.RemoteMemberID];
      // console.log("Xem pc có gì: ", pc);
      await pc
        .setRemoteDescription(
          new RTCSessionDescription(data.SDPAnswerConnect),
          () => {
            console.log("Có chạy vào đây");
          }
        )
        .catch(error => console.log(error));
    });

    this.props.socket.on("get-candidate-for-connect", async data => {
      // console.log("vào trong get-candidate-for-connect");
      const pc = this.state.peerConnections[data.RemoteMemberID];

      if (pc) {
        await pc.addIceCandidate(new RTCIceCandidate(data.CandidateConnect));
      }
    });
  };

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
              // zIndex: 2,
              // position: "absolute",
              // right: 0,
              width: 200
              // height: 200,
              // margin: 5,
              // backgroundColor: "black"
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
            // position: "fixed",
            bottom: 0,
            minWidth: "100%",
            // minHeight: "100%",
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
            // margin: 10,
            // backgroundColor: "#cdc4ff4f",
            // padding: 10,
            // borderRadius: 5
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

        {/* <Chat
          user={{
            uid: (this.socket && this.socket.id) || ""
          }}
          messages={this.state.messages}
          sendMessage={message => {
            this.setState(prevState => {
              return { messages: [...prevState.messages, message] };
            });
            this.state.sendChannels.map(sendChannel => {
              sendChannel.readyState === "open" &&
                sendChannel.send(JSON.stringify(message));
            });
            this.sendToPeer("new-message", JSON.stringify(message), {
              local: this.socket.id
            });
          }}
        /> */}
      </div>
    );
  }
}
