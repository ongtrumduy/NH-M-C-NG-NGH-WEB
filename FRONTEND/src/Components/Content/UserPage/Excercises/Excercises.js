import React from "react";
import "./Excercises.css";

import ExcercisesAllContent from "./ExcerciseAllContent/ExcercisesAllContent";
import ExcercisesCreateNew from "./ExcerciseCreateNew/ExcercisesCreateNew";

export default class Excercises extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setExcerciseRender: "Excerciseall"
    };
  }

  updateRenderExcerciseControl = state => {
    this.setState({
      setExcerciseRender: state
    });
  };

  renderExcerciseControlContent = () => {
    switch (this.state.setExcerciseRender) {
      case "createExcercisenew":
        return (
          <ExcercisesCreateNew
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseControl={this.updateRenderExcerciseControl}
          />
        );
      case "Excerciseall":
        return (
          <ExcercisesAllContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseControl={this.updateRenderExcerciseControl}
          />
        );
      default:
        return (
          <ExcercisesAllContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseControl={this.updateRenderExcerciseControl}
          />
        );
    }
  };

  render() {
    return (
      <div className="user-Excercises">
        {this.renderExcerciseControlContent()}
      </div>
    );
  }
}
