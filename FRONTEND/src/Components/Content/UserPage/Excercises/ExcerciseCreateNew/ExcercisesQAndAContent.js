import React from "react";
import Modal from "react-modal";
import axios from "axios";

import ExcercisesQAndAContentItem from "./ExcercisesQAndAContentItem";
import ExcercisesQAndAMainInfor from "./ExcerciseQAndAMainInfor";

export default class ExcercisesQAndAContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ExcerciseQAContent: [],
      ExcerciseNthQuestion: "1",

      checkValidatePrevLeft: true,
      checkValidateNextRight: false,
      overNumberQuestionIsOpen: false,
      checkQAContentNextQuestIsOpen: false,
      checkTrueOrderQuestion: false,
      checkCompleteExcerciseIsOpen: false
    };
  }

  openCheckCompleteExcerciseModal = () => {
    this.setState({
      checkCompleteExcerciseIsOpen: true
    });
  };

  closeCheckCompleteExcerciseModal = () => {
    this.setState({
      checkCompleteExcerciseIsOpen: false
    });
  };

  openCheckQAContentNextQuestModal = () => {
    this.setState({
      checkQAContentNextQuestIsOpen: true
    });
  };

  closeCheckQAContentNextQuestModal = () => {
    this.setState({
      checkQAContentNextQuestIsOpen: false
    });
  };

  openOverNumberQuestionModal = () => {
    this.setState({
      overNumberQuestionIsOpen: true
    });
  };

  closeOverNumberQuestionModal = () => {
    this.setState({
      overNumberQuestionIsOpen: false
    });
  };

  nextToNthQuestionOnRight = () => {
    if (!this.state.checkTrueOrderQuestion) {
      this.openCheckQAContentNextQuestModal();
    } else {
      if (!this.state.checkValidateNextRight) {
        if (
          parseInt(this.state.ExcerciseNthQuestion) + 1 + "" ===
          this.props.ExcerciseNumberQuestion
        ) {
          this.setState({
            checkValidateNextRight: true
          });
        }

        let nthindex = this.state.ExcerciseQAContent.findIndex(nthitem => {
          return (
            nthitem.ExcerciseNthQuestion ===
            parseInt(this.state.ExcerciseNthQuestion) + 1 + ""
          );
        });

        if (nthindex >= 0) {
          this.setState({
            ExcerciseNthQuestion:
              parseInt(this.state.ExcerciseNthQuestion) + 1 + "",
            checkValidatePrevLeft: false,
            checkTrueOrderQuestion: true
          });
        } else {
          this.setState({
            ExcerciseNthQuestion:
              parseInt(this.state.ExcerciseNthQuestion) + 1 + "",
            checkValidatePrevLeft: false,
            checkTrueOrderQuestion: false
          });
        }
      } else {
        this.openOverNumberQuestionModal();
      }
    }
  };

  prevToNthQuestionOnLeft = () => {
    if (!this.state.checkValidatePrevLeft) {
      if (parseInt(this.state.ExcerciseNthQuestion) - 1 + "" === "1") {
        this.setState({
          checkValidatePrevLeft: true
        });
      }

      this.setState({
        ExcerciseNthQuestion:
          parseInt(this.state.ExcerciseNthQuestion) - 1 + "",
        checkValidateNextRight: false,
        checkTrueOrderQuestion: true
      });
    } else {
      this.openOverNumberQuestionModal();
    }
  };

  getAllQAContentToExcerciseContent = (
    ExcerciseNthQuestion,
    ExcerciseQuestionContent,
    ExcerciseAnswerContentA,
    ExcerciseAnswerContentB,
    ExcerciseAnswerContentC,
    ExcerciseAnswerContentD,
    ExcerciseCorrectAnswer
  ) => {
    let QAContent = {
      ExcerciseNthQuestion: ExcerciseNthQuestion,
      ExcerciseQuestionContent: ExcerciseQuestionContent,
      ExcerciseAnswerContentA: ExcerciseAnswerContentA,
      ExcerciseAnswerContentB: ExcerciseAnswerContentB,
      ExcerciseAnswerContentC: ExcerciseAnswerContentC,
      ExcerciseAnswerContentD: ExcerciseAnswerContentD,
      ExcerciseCorrectAnswer: ExcerciseCorrectAnswer
    };
    let nthindex = this.state.ExcerciseQAContent.findIndex(questitem => {
      return questitem.ExcerciseNthQuestion === ExcerciseNthQuestion;
    });
    if (nthindex >= 0) {
      this.state.ExcerciseQAContent.splice(nthindex, 1, QAContent);
      this.setState({
        ExcerciseQAContent: this.state.ExcerciseQAContent
      });
    } else {
      this.setState({
        ExcerciseQAContent: [...this.state.ExcerciseQAContent, QAContent],
        checkTrueOrderQuestion: true
      });
    }
  };

  sendAllQAndAExcerciseContent = () => {
    axios
      .post("/createnewExcercisecontent", {})
      .then(res => {
        console.log("...................",res.data);
        this.setState({
          checkValidate: res.data.checkValidate
        });
        if (res.data.checkValidate === "success-create-Excercise-content") {
          setTimeout(() => {
            this.props.updateRenderExcerciseControl("Excerciseall");
          }, 1000);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  sendToCompleteExcercises = () => {
    if (
      this.state.ExcerciseQAContent.length() !==
      this.props.ExcerciseNumberQuestion
    ) {
      this.openCheckCompleteExcerciseModal();
    } else {
      this.sendAllQAndAExcerciseContent();
    }
  };

  ExcerciseQAndAControl = () => {
    return (
      <div className="user-Excercises_create-new__QandA___control">
        <div>
          <i
            style={
              this.state.checkValidatePrevLeft
                ? { color: "gray" }
                : { color: "blue" }
            }
            onClick={() => this.prevToNthQuestionOnLeft()}
            className="material-icons"
          >
            &#xe5c4;
          </i>
        </div>
        <div>
          <i
            style={
              this.state.checkValidateNextRight
                ? { color: "gray" }
                : { color: "blue" }
            }
            onClick={() => this.nextToNthQuestionOnRight()}
            className="material-icons"
          >
            &#xe5c8;
          </i>
        </div>
        <div>
          <input
            type="button"
            value="Hoàn tất"
            onClick={() => this.sendToCompleteExcercises()}
          />
        </div>
      </div>
    );
  };

  renderExcercisesQAndAContentItem = () => {
    let nthindex = this.state.ExcerciseQAContent.findIndex(questitem => {
      return questitem.ExcerciseNthQuestion === this.state.ExcerciseNthQuestion;
    });

    if (nthindex >= 0) {
      return (
        <ExcercisesQAndAContentItem
          ExcerciseNthQuestion={this.state.ExcerciseNthQuestion}
          getAllQAContentToExcerciseContent={
            this.getAllQAContentToExcerciseContent
          }
          ExcerciseQuestionContent={
            this.state.ExcerciseQAContent[nthindex].ExcerciseQuestionContent
          }
          ExcerciseAnswerContentA={
            this.state.ExcerciseQAContent[nthindex].ExcerciseAnswerContentA
          }
          ExcerciseAnswerContentB={
            this.state.ExcerciseQAContent[nthindex].ExcerciseAnswerContentB
          }
          ExcerciseAnswerContentC={
            this.state.ExcerciseQAContent[nthindex].ExcerciseAnswerContentC
          }
          ExcerciseAnswerContentD={
            this.state.ExcerciseQAContent[nthindex].ExcerciseAnswerContentD
          }
          ExcerciseCorrectAnswer={
            this.state.ExcerciseQAContent[nthindex].ExcerciseCorrectAnswer
          }
        />
      );
    } else {
      return (
        <ExcercisesQAndAContentItem
          ExcerciseNthQuestion={this.state.ExcerciseNthQuestion}
          getAllQAContentToExcerciseContent={
            this.getAllQAContentToExcerciseContent
          }
          ExcerciseQuestionContent=""
          ExcerciseAnswerContentA=""
          ExcerciseAnswerContentB=""
          ExcerciseAnswerContentC=""
          ExcerciseAnswerContentD=""
          ExcerciseCorrectAnswer=""
        />
      );
    }
  };

  createNewExcerciseQAContent = () => {
    return (
      <div className="user-Excercises_create-new__QandA">
        <ExcercisesQAndAMainInfor
          MemberID={this.props.MemberID}
          socket={this.props.socket}
          updateRenderExcerciseControl={this.props.updateRenderExcerciseControl}
          updateRenderExcerciseCreateNewControl={
            this.props.updateRenderExcerciseCreateNewControl
          }
          ExcerciseName={this.props.ExcerciseName}
          ExcerciseNumberQuestion={this.props.ExcerciseNumberQuestion}
          ExcerciseType={this.props.ExcerciseType}
          ExcerciseLogo={this.props.ExcerciseLogo}
        />

        {this.renderExcercisesQAndAContentItem()}
        {this.ExcerciseQAndAControl()}
      </div>
    );
  };

  render() {
    console.log("Ra ExcerciseQAContent", this.state.ExcerciseQAContent);
    return (
      <div>
        {this.createNewExcerciseQAContent()}

        <Modal
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#ecf0f1"
            }
          }}
          ariaHideApp={false}
          isOpen={this.state.overNumberQuestionIsOpen}
          onRequestClose={this.closeOverNumberQuestionModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮc NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Không thể vượt quá số lượng câu hỏi của Bộ đề - Bài tập !!!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeOverNumberQuestionModal()}
          >
            Đã hiểu!!!
          </button>
        </Modal>

        <Modal
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#ecf0f1"
            }
          }}
          ariaHideApp={false}
          isOpen={this.state.checkQAContentNextQuestIsOpen}
          onRequestClose={this.closeCheckQAContentNextQuestModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮc NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn phải nhập đầy đủ nội dung của Câu hỏi số &nbsp;
              {this.state.ExcerciseNthQuestion} này đã !!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckQAContentNextQuestModal()}
          >
            Đã hiểu!!!
          </button>
        </Modal>

        <Modal
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "#ecf0f1"
            }
          }}
          ariaHideApp={false}
          isOpen={this.state.checkCompleteExcerciseIsOpen}
          onRequestClose={this.closeCheckCompleteExcerciseModal}
        >
          <div>
            <p style={{ fontWeight: "bold", color: "red" }}>NHẮc NHỞ</p>
            <p style={{ fontWeight: "bold" }}>
              Bạn chưa hoàn thành nội dung cho tất cả các câu hỏi có trong Bộ đề
              - Bài tập !!!
            </p>
          </div>
          <button
            style={{ float: "right", cursor: "pointer" }}
            onClick={() => this.closeCheckCompleteExcerciseModal()}
          >
            Đã hiểu!!!
          </button>
        </Modal>
      </div>
    );
  }
}
