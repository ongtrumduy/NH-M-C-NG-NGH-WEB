import React from "react";
import axios from "axios";

import logoaaa from "../../../../Main/Image-Icons/aaa.PNG";
import logobbb from "../../../../Main/Image-Icons/bbb.PNG";
import logoccc from "../../../../Main/Image-Icons/ccc.PNG";
import logoddd from "../../../../Main/Image-Icons/ddd.PNG";
import logoeee from "../../../../Main/Image-Icons/eee.PNG";
import logofff from "../../../../Main/Image-Icons/fff.PNG";
import logoggg from "../../../../Main/Image-Icons/ggg.PNG";
import logohhh from "../../../../Main/Image-Icons/hhh.PNG";
import logoiii from "../../../../Main/Image-Icons/iii.PNG";
import logokkk from "../../../../Main/Image-Icons/kkk.PNG";
import logolll from "../../../../Main/Image-Icons/lll.PNG";
import logommm from "../../../../Main/Image-Icons/mmm.PNG";

export default class TeamsCreateTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setLogoChoose: logoaaa,
      TeamName: "",
      TeamDescription: "",
      checkValidate: ""
    };
  }

  handleChooseLogo = event => {
    this.setState({
      setLogoChoose: event.target.value
    });
  };

  handleValueCreateNewTeam = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  sentToCreateNewTeam = () => {
    axios
      .post("/createnewteam", {
        TeamName: this.state.TeamName,
        TeamDescription: this.state.TeamDescription,
        TeamLogo: this.state.setLogoChoose,
        MemberID: this.props.MemberID
      })
      .then(res => {
        // console.log(res.data);
        this.setState({
          checkValidate: res.data.checkValidate
        });
        if (res.data.checkValidate === "success-create-team") {
          setTimeout(() => {
            this.props.updateRenderTeamControl("teamall");
          }, 1000);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleCreateNewTeam = event => {
    this.sentToCreateNewTeam();

    event.preventDefault();
  };

  checkValidateCreateNewTeam = type => {
    switch (type) {
      case "success-create-team":
        return <span>Nhóm của bạn đã được tạo thành công </span>;
      case "existed-team":
        return <span>Tên nhóm này đã tồn tại !!!</span>;
      case "teamname":
        return <small>Tên nhóm không được để trống !!!</small>;
      default:
    }
  };

  renderValidateNotify = type => {
    if (this.state.checkValidate === type) {
      return <div>{this.checkValidateCreateNewTeam(type)}</div>;
    }
  };

  createTeamForm = () => {
    return (
      <div className="user-teams_create">
        <div
          className="user-teams_create__backtoteamall"
          onClick={() => this.props.updateRenderTeamControl("teamall")}
        >
          <div>
            <i className="material-icons"> &#xe5c4;</i>
          </div>
          <div>
            <span>Quay lại</span>
          </div>
        </div>
        <form onSubmit={event => this.handleCreateNewTeam(event)}>
          <div className="user-teams_create__team">
            <div className="user-teams_create__team___form">
              <div>
                <p>Tên nhóm</p>
                <input
                  type="text"
                  name="TeamName"
                  onChange={event => this.handleValueCreateNewTeam(event)}
                  placeholder="Nhập tên nhóm..."
                />
                <p>Mô tả</p>
                <input
                  type="text"
                  name="TeamDescription"
                  onChange={event => this.handleValueCreateNewTeam(event)}
                  placeholder="Nhập mô tả..."
                />
                <p>Chọn ảnh đại diện cho nhóm</p>
                <select
                  value={this.state.setLogoChoose}
                  onChange={event => this.handleChooseLogo(event)}
                >
                  <option value={logoaaa}>Ảnh 1</option>
                  <option value={logobbb}>Ảnh 2</option>
                  <option value={logoccc}>Ảnh 3</option>
                  <option value={logoddd}>Ảnh 4</option>
                  <option value={logoeee}>Ảnh 5</option>
                  <option value={logofff}>Ảnh 6</option>
                  <option value={logoggg}>Ảnh 7</option>
                  <option value={logohhh}>Ảnh 8</option>
                  <option value={logoiii}>Ảnh 9</option>
                  <option value={logokkk}>Ảnh 10</option>
                  <option value={logolll}>Ảnh 11</option>
                  <option value={logommm}>Ảnh 12</option>
                </select>
              </div>
              <div className="user-teams_create__team___response-create-team">
                <div className="user-teams_create__team___validate">
                  {this.renderValidateNotify("teamname")}
                </div>
                {this.renderValidateNotify("success-create-team")}
                {this.renderValidateNotify("existed-team")}
              </div>
              <div className="user-teams_create__team___form____create-button">
                <input type="submit" value="Tạo Nhóm" />
              </div>
            </div>

            <div className="user-teams_create__team___logo">
              <div>
                <img alt="team-logo" src={this.state.setLogoChoose} />
              </div>
              <div>
                <p>Ảnh đại diện nhóm</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  };

  render() {
    return <div>{this.createTeamForm()}</div>;
  }
}
