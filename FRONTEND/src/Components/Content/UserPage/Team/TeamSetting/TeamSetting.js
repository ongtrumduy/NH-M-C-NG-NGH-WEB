import React from "react";
import Modal from "react-modal";

export default class TeamSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      secondModalIsOpen: false
    };
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  openSecondModal = () => {
    this.setState({ secondModalIsOpen: true });
  };

  closeSecondModal = () => {
    this.setState({ secondModalIsOpen: false });
  };

  renderTestForm = () => {
    return (
      <div>
        <p>Test thử text</p>
        <input type="text" />
      </div>
    );
  };

  render() {
    return (
      <div>
        <button onClick={this.openModal}>Open Modal</button>
        <button onClick={this.openSecondModal}>Open Second Modal</button>

        <Modal
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "green"
            }
          }}
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        >
          <div>{this.renderTestForm()}</div>
          <button onClick={this.closeModal}>Đóng</button>
        </Modal>

        <Modal
          isOpen={this.state.secondModalIsOpen}
          onRequestClose={this.closeSecondModal}
        >
          <div>second modal</div>
          <button onClick={this.closeSecondModal}>Đóng</button>
        </Modal>
      </div>
    );
  }
}
