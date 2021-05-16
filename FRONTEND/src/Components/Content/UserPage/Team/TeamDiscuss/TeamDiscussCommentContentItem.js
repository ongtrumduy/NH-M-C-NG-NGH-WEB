import React from "react";
import defaultavatar from "../../../../Main/Image-Icons/default-avatar.png";

export default class TeamDiscussCommentContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________discussreplyinput_________comment">
        <div className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________discussreplyinput_________comment_____________avatar">
          <img
            style={{ height: "28px", width: "28px", margin: "4px 0 0 0" }}
            src={defaultavatar}
            alt="defalut-avatar"
          />
        </div>
        <div className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________discussreplyinput_________comment_____________commentbox">
          <div className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________discussreplyinput_________comment_____________commentbox__________nameandtime">
            <div
              onClick={() =>
                this.props.setChoiceTeamMemberChatID(this.props.MemberCommentID)
              }
              className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________discussreplyinput_________comment_____________commentbox___________fullname"
            >
              {this.props.MemberCommentFullName}-{this.props.MemberCommentID}
            </div>
            <div className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________discussreplyinput_________comment_____________commentbox___________timedate">
              {this.props.MemberCommentTime}
            </div>
          </div>
          <div className="user-team_team-menu-and-content__content___discuss_____alldiscuss_____discuss_______discussbox________discussreplyinput_________comment_____________commentbox__________content">
            <p>{this.props.MemberCommentContent}</p>
          </div>
        </div>
      </div>
    );
  }
}
