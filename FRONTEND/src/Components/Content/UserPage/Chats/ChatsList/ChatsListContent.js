import React from "react";
import avatar from "../../../../Main/Image-Icons/default-avatar.png";

export default class ChatsListContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-chat_list__content">
        <div className="user-chat_list__content___infor">
          <div className="user-chat_list__content___infor_____avatar">
            <img
              style={{ height: "40px", width: "40px" }}
              alt="default-avatar"
              src={avatar}
            />
          </div>
          <div className="user-chat_list__content___infor_____fullname">
            <span style={{ fontWeight: "bold" }}> Phạm Duy</span>
          </div>
        </div>
      </div>
    );
  }
}
