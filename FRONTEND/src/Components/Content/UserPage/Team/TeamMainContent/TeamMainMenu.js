import React from "react";

export default class TeamMainMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { setSelectTeam: "discuss" };
  }

  setSelectTeamClickChoose = setSelect => {
    this.props.setSelectTeamContentClickChoose(setSelect);
    this.setState({
      setSelectTeam: setSelect
    });
  };

  startBeginCallVideoTeam = () => {
    this.props.socket.emit("start-begin-call-video", {
      TeamID: this.props.TeamID,
      MemberID: this.props.MemberID,
      MemberSocketID: this.props.socket.id
    });
    // this.props.socket.on("joined-team-call", data => {
    //   alert(data.Alert);
    // });
    // this.props.socket.on("non-joined-team-call", data => {
    this.props.updateRenderTeamControl("videocall");
    // });
  };

  componentDidMount = () => {};

  render() {
    return (
      <div className="user-team_team-menu-and-content__menu">
        {this.props.ChooseTeamInfor.map((teaminforitem, teaminforindex) => (
          <div key={teaminforindex}>
            <img src={teaminforitem.TeamLogo} alt="team-logo" />
          </div>
        ))}
        <div>
          <button
            style={
              this.state.setSelectTeam === "discuss"
                ? {
                    color: "blue",
                    borderBottom: "groove",
                    outline: "none",
                    borderBottomColor: " rgb(216, 215, 215)",
                    fontWeight: "bold"
                  }
                : {}
            }
            onClick={() => this.setSelectTeamClickChoose("discuss")}
          >
            Thảo luận
          </button>
        </div>
        <div>
          <button
            style={
              this.state.setSelectTeam === "files"
                ? {
                    color: "blue",
                    borderBottom: "groove",
                    outline: "none",
                    borderBottomColor: " rgb(216, 215, 215)",
                    fontWeight: "bold"
                  }
                : {}
            }
            onClick={() => this.setSelectTeamClickChoose("files")}
          >
            Tệp
          </button>
        </div>
        <div>
          <button
            style={
              this.state.setSelectTeam === "notes"
                ? {
                    color: "blue",
                    borderBottom: "groove",
                    outline: "none",
                    borderBottomColor: " rgb(216, 215, 215)",
                    fontWeight: "bold"
                  }
                : {}
            }
            onClick={() => this.setSelectTeamClickChoose("notes")}
          >
            Ghi chú
          </button>
        </div>
        <div className="user-team_team-menu-and-content__callsetting">
          <div className="user-team_team-menu-and-content__callsetting___call">
            <button onClick={() => this.startBeginCallVideoTeam()}>
              <i className="material-icons" style={{ fontSize: "32px" }}>
                &#xe070;
              </i>
            </button>
          </div>
          <div className="user-team_team-menu-and-content__callsetting___setting">
            <button
              style={
                this.state.setSelectTeam === "settings"
                  ? {
                      color: "blue",
                      borderBottom: "groove",
                      outline: "none",
                      borderBottomColor: " rgb(216, 215, 215)",
                      fontWeight: "bold"
                    }
                  : {}
              }
              onClick={() => this.setSelectTeamClickChoose("settings")}
            >
              <i className="material-icons" style={{ fontSize: "32px" }}>
                &#xe8b8;
              </i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
