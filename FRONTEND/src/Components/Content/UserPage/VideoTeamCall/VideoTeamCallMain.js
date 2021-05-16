import React from "react";
import VideoTeamCallContent from "./VideoTeamCallContent";

export default class VideoTeamCallMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LocalMemberStream: null,

      RemoteMemberStream: null,
      AllRemoteMemberStreams: [],

      PeerMemberConnections: {},
      SelectedMemberVideo: null,

      StatusConnect: "Chờ mọi người tham gia...",

      pc_config: {
        iceServers: [
          {
            urls: "stun:stun.l.google.com:19302"
          }
        ]
      },

      sdpConstraints: {
        madatory: {
          OfferToReceiveAudio: true,
          OfferToReceiveVideo: true
        }
      }
    };
  }

  getLocalMemberCallStream = () => {
    const success = memberstream => {
      window.LocalMemberStream = memberstream;
      this.setState({
        LocalMemberStream: memberstream
      });

      this.props.socket.emit("online-call-peer-members", {
        TeamID: this.props.TeamID,
        LocalMemberID: this.props.MemberID,
        LocalMemberSocketID: this.props.socket.id
      });
    };

    const failure = error => {
      console.log("Bắt call video bị lỗi: ", error);
    };

    const constraints = {
      video: true,
      audio: { echoCancellation: true },
      options: {
        mirror: true
      }
    };

    (async () => {
      const memberstream = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      success(memberstream);
    })().catch(failure);
  };

  createPeerMemberOfTeamConnection = (
    RemoteMemberID,
    RemoteMemberSocketID,
    callback
  ) => {
    try {
      let peermemberconnnection = new RTCPeerConnection(this.state.pc_config);

      const peermemberconnnections = {
        ...this.state.PeerMemberConnections,
        [RemoteMemberID]: peermemberconnnection
      };

      this.setState({
        peermemberconnnections
      });

      console.log("peermemberconnnections ra " + peermemberconnnections);

      peermemberconnnection.onicecandidate = event => {
        if (event.candidate) {
          this.props.socket.emit("set-candidate-to-connect", {
            CandidateConnect: event.candidate,
            LocalMemberID: this.props.MemberID,
            LocalMemberSocketID: this.props.socket.id,
            RemoteMemberID: RemoteMemberID,
            RemoteMemberSocketID: RemoteMemberSocketID
          });
        }
      };

      peermemberconnnection.ontrack = event => {
        let remoteStream = null;
        let remoteStreams = this.state.AllRemoteMemberStreams;
        let remoteVideo = {};

        const remoteVideos = this.state.AllRemoteMemberStreams.filter(
          memberstream => memberstream.RemoteMemberID === RemoteMemberID
        );
        console.log("remoteVideos " + remoteVideos);

        if (remoteVideos.length) {
          remoteStream = remoteVideos[0].RemoteMemberStream;
          remoteStream.addTrack(event.track, remoteStream);
          remoteVideo = {
            ...remoteVideos[0],
            RemoteMemberStream: remoteStream
          };

          remoteStreams = this.state.remoteStreams.map(remotevideo => {
            return (
              (remotevideo.RemoteMemberID === remoteVideo.RemoteMemberID &&
                remoteVideo) ||
              remotevideo
            );
          });
        } else {
          console.log("remoteVideos vào đây");

          remoteStream = new MediaStream();
          remoteStream.addTrack(event.track, remoteStream);

          remoteVideo = {
            RemoteMemberSocketID: RemoteMemberSocketID,
            RemoteMemberID: RemoteMemberID,
            RemoteMemberStream: remoteStream
          };

          remoteStreams = [...this.state.AllRemoteMemberStreams, remoteVideo];
        }

        this.setState(prevState => {
          const remoteMemberStream =
            prevState.AllRemoteMemberStreams.length > 0
              ? {}
              : { RemoteMemberStream: remoteStream };

          let selectedVideo = prevState.AllRemoteMemberStreams.filter(
            memberstream =>
              memberstream.RemoteMemberID ===
              prevState.SelectedMemberVideo.RemoteMemberID
          );

          selectedVideo = selectedVideo.length
            ? {}
            : { SelectedMemberVideo: remoteVideo };
          return {
            ...selectedVideo,
            ...remoteMemberStream,
            remoteStreams
          };
        });
      };

      peermemberconnnection.close = () => {};

      if (this.state.LocalMemberStream) {
        this.state.LocalMemberStream.getTracks().forEach(membertrack => {
          peermemberconnnection.addTrack(
            membertrack,
            this.state.LocalMemberStream
          );
        });
      }

      callback(peermemberconnnection);
    } catch (error) {
      console.log("Kết nối ngang hàng thiết lập bị lỗi: ", error);
      callback(null);
    }
  };

  componentDidMount = () => {
    this.props.socket.on("connection-call-success", data => {
      console.log("Đã kết nối thành công");
      this.getLocalMemberCallStream();

      const statusconnect =
        data.MemberPeerCount > 1
          ? `Tổng số người tham gia: ${data.MemberPeerCount}`
          : "Chờ mọi người tham gia...";

      this.setState({
        StatusConnect: statusconnect
      });
    });

    this.props.socket.on("peer-member-call-disconnected", data => {
      const remoteStreams = this.state.AllRemoteMemberStreams.filter(
        memberstream => memberstream.RemoteMemberID !== data.RemoteMemberID
      );

      this.setState(prevState => {
        const selectedVideo =
          prevState.SelectedMemberVideo.RemoteMemberID ===
            data.RemoteMemberID && remoteStreams.length
            ? { SelectedMemberVideo: remoteStreams[0] }
            : null;

        return {
          remoteStreams,
          ...selectedVideo
        };
      });
    });

    this.props.socket.on("connect-all-member-call", data => {
      console.log(
        "vào để tạo kết nối giữa các thành viên ",
        data.RemoteMemberID
      );
      this.createPeerMemberOfTeamConnection(
        data.RemoteMemberID,
        data.RemoteMemberSocketID,
        peermemberconnnection => {
          if (peermemberconnnection) {
            peermemberconnnection
              .createOffer(this.state.sdpConstraints)
              .then(offersdp => {
                peermemberconnnection.setLocalDescription(offersdp);

                this.props.socket.emit("offer-to-connect-team-call", {
                  SDPOfferConnect: offersdp,
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
      // console.log("data SDPOfferConnect nhận về: " + data.SDPOfferConnect);
      // console.log("data RemoteMemberID nhận về: " + data.RemoteMemberID);

      this.createPeerMemberOfTeamConnection(
        data.RemoteMemberID,
        data.RemoteMemberSocketID,

        peermemberconnnection => {
          peermemberconnnection.addStream(this.state.LocalMemberStream);

          peermemberconnnection
            .setRemoteDescription(
              new RTCSessionDescription(data.SDPOfferConnect)
            )
            .then(() => {
              peermemberconnnection
                .createAnswer(this.state.sdpConstraints)
                .then(answersdp => {
                  peermemberconnnection.setLocalDescription(answersdp);

                  this.props.socket.emit("answer-to-connect-team-call", {
                    SDPAnswerConnect: answersdp,
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

    this.props.socket.on("answer-for-connect-team-call", data => {
      const peermemberconnnection = this.state.PeerMemberConnections[
        data.RemoteMemberID
      ];
      // console.log("data nhận về: " + data.RemoteMemberID);

      // console.log("peermemberconnnection tạo: " + peermemberconnnection);

      peermemberconnnection
        .setLocalDescription(new RTCSessionDescription(data.SDPAnswerConnect))
        .then(() => {});
    });

    this.props.socket.on("get-candidate-for-connect", data => {
      const peermemberconnnection = this.state.PeerMemberConnections[
        data.RemoteMemberID
      ];

      if (peermemberconnnection) {
        peermemberconnnection.addIceCandidate(
          new RTCIceCandidate(data.CandidateConnect)
        );
      }
    });
  };

  switchMemberVideoCall = selectMemberVideo => {
    this.setState({
      SelectedMemberVideo: selectMemberVideo
    });
  };

  render() {
    return (
      <div>
        <VideoTeamCallContent
          LocalMemberStream={this.state.LocalMemberStream}
          RemoteMemberStream={this.state.RemoteMemberStream}
          AllRemoteMemberStreams={this.state.AllRemoteMemberStreams}
          SelectedMemberVideo={this.state.SelectedMemberVideo}
          switchMemberVideoCall={this.switchMemberVideoCall}
        />
      </div>
    );
  }
}
