import React from "react";
import "./ExcercisesCreateNew.css";

import ExcercisesCreateNewMain from "./ExcercisesCreateNewMain";
import ExcercisesQAndAContent from "./ExcercisesQAndAContent";

export default class ExcercisesCreateNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setExcerciseCreateNewRender: "createnewmain",
      ExcerciseName: "",
      ExcerciseDescription: "",
      ExcerciseNumberQuestion: "",
      ExcerciseType: "",
      ExcerciseLogo: null
    };
  }

  updateRenderExcerciseCreateNewControl = state => {
    this.setState({
      setExcerciseCreateNewRender: state
    });
  };

  setExcerciseContentToCreateQAContent = (
    excerciseName,
    excerciseNumberQuestion,
    excerciseType,
    excerciseLogo
  ) => {
    this.setState({
      ExcerciseName: excerciseName,
      ExcerciseNumberQuestion: excerciseNumberQuestion,
      ExcerciseType: excerciseType,
      ExcerciseLogo: excerciseLogo
    });
  };

  renderExcerciseCreateNewControlContent = () => {
    switch (this.state.setExcerciseCreateNewRender) {
      case "createnewQAcontent":
        return (
          <ExcercisesQAndAContent
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControl
            }
            updateRenderExcerciseCreateNewControl={
              this.updateRenderExcerciseCreateNewControl
            }
            ExcerciseName={this.state.ExcerciseName}
            ExcerciseNumberQuestion={this.state.ExcerciseNumberQuestion}
            ExcerciseType={this.state.ExcerciseType}
            ExcerciseLogo={this.state.ExcerciseLogo}
          />
        );
      case "createnewmain":
        return (
          <ExcercisesCreateNewMain
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControl
            }
            updateRenderExcerciseCreateNewControl={
              this.updateRenderExcerciseCreateNewControl
            }
            setExcerciseContentToCreateQAContent={
              this.setExcerciseContentToCreateQAContent
            }
          />
        );

      default:
        return (
          <ExcercisesCreateNewMain
            MemberID={this.props.MemberID}
            socket={this.props.socket}
            updateRenderExcerciseControl={
              this.props.updateRenderExcerciseControl
            }
            updateRenderExcerciseCreateNewControl={
              this.updateRenderExcerciseCreateNewControl
            }
            setExcerciseContentToCreateQAContent={
              this.setExcerciseContentToCreateQAContent
            }
          />
        );
    }
  };

  render() {
    return (
      <div className="user-excercises_create-new">
        {this.renderExcerciseCreateNewControlContent()}
      </div>
    );
  }
}
