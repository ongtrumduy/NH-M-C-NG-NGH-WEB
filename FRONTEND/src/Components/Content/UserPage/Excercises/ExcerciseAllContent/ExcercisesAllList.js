import React from "react";

import ExcercisesOwnedList from "./ExcercisesOwnedList";
import ExcercisesPublicList from "./ExcercisesPublicList";
import ExcercisesPrivateList from "./ExcercisesPrivateList";

export default class ExcercisesAllList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { setExcerciseListRender: "ownedlist" };
  }

  handleValueExcerciseList = event => {
    this.setState({
      setExcerciseListRender: event.target.value
    });
  };

  renderAllExcerciseOptionList = () => {
    switch (this.state.setExcerciseListRender) {
      case "ownedlist":
        return (
          <ExcercisesOwnedList
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControl
            }
          />
        );
      case "publiclist":
        return (
          <ExcercisesPublicList
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControl
            }
          />
        );
      case "privatelist":
        return (
          <ExcercisesPrivateList
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControl
            }
          />
        );
      default:
        return (
          <ExcercisesOwnedList
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControl
            }
          />
        );
    }
  };

  render() {
    return (
      <div className="user-Excercises_all-list">
        <div className="user-Excercises_all-list__select-choose">
          <div className="user-Excercises_all-list__select-choose___search">
            <input type="text" />
            <input type="button" value="Tìm kiếm" />
          </div>
          <div className="user-Excercises_all-list__select-choose___Excercise-list">
            <input
              type="radio"
              value="publiclist"
              checked={this.state.setExcerciseListRender === "publiclist"}
              onChange={event => this.handleValueExcerciseList(event)}
            />
            <span>&nbsp;&nbsp;Công khai</span>
            <input
              type="radio"
              value="privatelist"
              checked={this.state.setExcerciseListRender === "privatelist"}
              onChange={event => this.handleValueExcerciseList(event)}
            />
            <span>&nbsp;&nbsp;Riêng tư</span>
            <input
              type="radio"
              value="ownedlist"
              checked={this.state.setExcerciseListRender === "ownedlist"}
              onChange={event => this.handleValueExcerciseList(event)}
            />
            <span>&nbsp;&nbsp;Đã sở hữu</span>
          </div>
        </div>
        {this.renderAllExcerciseOptionList()}
      </div>
    );
  }
}
