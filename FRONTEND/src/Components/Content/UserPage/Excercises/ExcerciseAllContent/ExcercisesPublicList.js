import React from "react";
import axios from "axios";

import de111 from "../../../../Main/Image-Icons/de111.PNG";

export default class ExcercisesPublicList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      AllExcercisePublicList: [
        {
          ExcerciseID: "05639310-994f-11eb-a756-a587cab160af",
          ExcerciseMemberAdminID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6",
          ExcerciseInfor: [
            {
              ExcerciseName: "Kiến tạo đế quốc",
              ExcerciseDescription: "Cách thức xây dựng một quốc gia",
              ExcerciseLogo: "/static/media/eee.738b7a7b.PNG"
            }
          ],
          ExcerciseMember: [
            { MemberID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6" }
          ]
        },
        {
          ExcerciseID: "4728a270-9979-11eb-9f65-9b578b443991",
          ExcerciseMemberAdminID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6",
          ExcerciseInfor: [
            {
              ExcerciseName: "kiến tạo quốc viện",
              ExcerciseDescription: "kiến tạo lục viện",
              ExcerciseLogo: "/static/media/kkk.16477550.PNG"
            }
          ],
          ExcerciseMember: [
            { MemberID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6" }
          ]
        },
        {
          ExcerciseID: "1c130670-997e-11eb-9f65-9b578b443991",
          ExcerciseMemberAdminID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6",
          ExcerciseInfor: [
            {
              ExcerciseName: "Kiến tạo chánh phủ",
              ExcerciseDescription: "Kiến tạo chánh phủ trung ương",
              ExcerciseLogo: "/static/media/lll.cba69ff3.PNG"
            }
          ],
          ExcerciseMember: [
            { MemberID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6" }
          ]
        },
        {
          ExcerciseID: "37173950-997e-11eb-9f65-9b578b443991",
          ExcerciseMemberAdminID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6",
          ExcerciseInfor: [
            {
              ExcerciseName: "Suy tôn đại hòang đế đại đế quốc",
              ExcerciseDescription: "suy tôn đại đế",
              ExcerciseLogo: "/static/media/aaa.a1db6d38.PNG"
            }
          ],
          ExcerciseMember: [
            { MemberID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6" },
            { MemberID: "569b6b18-e403-4f34-990a-ebc6f90f2171" }
          ]
        },
        {
          ExcerciseID: "84c6b250-9980-11eb-9f65-9b578b443991",
          ExcerciseMemberAdminID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6",
          ExcerciseInfor: [
            {
              ExcerciseName:
                "Xây dựng thái bình thịnh trị ấm no cho muôn dân đế quốc",
              ExcerciseDescription:
                "Xây dựng thái bình thịnh trị ấm no cho muôn dân đế quốc",
              ExcerciseLogo: "/static/media/ggg.8304c57a.PNG"
            }
          ],
          ExcerciseMember: [
            { MemberID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6" },
            { MemberID: "569b6b18-e403-4f34-990a-ebc6f90f2171" },
            { MemberID: "f41fdbc0-0ca7-4777-8d05-9c0fee8900c3" }
          ]
        },
        {
          ExcerciseID: "84c6b250-9980-11eb-9f65-9b578b443991",
          ExcerciseMemberAdminID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6",
          ExcerciseInfor: [
            {
              ExcerciseName:
                "Xây dựng thái bình thịnh trị ấm no cho muôn dân đế quốc",
              ExcerciseDescription:
                "Xây dựng thái bình thịnh trị ấm no cho muôn dân đế quốc",
              ExcerciseLogo: "/static/media/ggg.8304c57a.PNG"
            }
          ],
          ExcerciseMember: [
            { MemberID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6" },
            { MemberID: "569b6b18-e403-4f34-990a-ebc6f90f2171" },
            { MemberID: "f41fdbc0-0ca7-4777-8d05-9c0fee8900c3" }
          ]
        },
        {
          ExcerciseID: "84c6b250-9980-11eb-9f65-9b578b443991",
          ExcerciseMemberAdminID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6",
          ExcerciseInfor: [
            {
              ExcerciseName:
                "Xây dựng thái bình thịnh trị ấm no cho muôn dân đế quốc",
              ExcerciseDescription:
                "Xây dựng thái bình thịnh trị ấm no cho muôn dân đế quốc",
              ExcerciseLogo: "/static/media/ggg.8304c57a.PNG"
            }
          ],
          ExcerciseMember: [
            { MemberID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6" },
            { MemberID: "569b6b18-e403-4f34-990a-ebc6f90f2171" },
            { MemberID: "f41fdbc0-0ca7-4777-8d05-9c0fee8900c3" }
          ]
        },
        {
          ExcerciseID: "84c6b250-9980-11eb-9f65-9b578b443991",
          ExcerciseMemberAdminID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6",
          ExcerciseInfor: [
            {
              ExcerciseName:
                "Xây dựng thái bình thịnh trị ấm no cho muôn dân đế quốc",
              ExcerciseDescription:
                "Xây dựng thái bình thịnh trị ấm no cho muôn dân đế quốc",
              ExcerciseLogo: "/static/media/ggg.8304c57a.PNG"
            }
          ],
          ExcerciseMember: [
            { MemberID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6" },
            { MemberID: "569b6b18-e403-4f34-990a-ebc6f90f2171" },
            { MemberID: "f41fdbc0-0ca7-4777-8d05-9c0fee8900c3" }
          ]
        },
        {
          ExcerciseID: "84c6b250-9980-11eb-9f65-9b578b443991",
          ExcerciseMemberAdminID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6",
          ExcerciseInfor: [
            {
              ExcerciseName:
                "Xây dựng thái bình thịnh trị ấm no cho muôn dân đế quốc",
              ExcerciseDescription:
                "Xây dựng thái bình thịnh trị ấm no cho muôn dân đế quốc",
              ExcerciseLogo: "/static/media/ggg.8304c57a.PNG"
            }
          ],
          ExcerciseMember: [
            { MemberID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6" },
            { MemberID: "569b6b18-e403-4f34-990a-ebc6f90f2171" },
            { MemberID: "f41fdbc0-0ca7-4777-8d05-9c0fee8900c3" }
          ]
        },
        {
          ExcerciseID: "84c6b250-9980-11eb-9f65-9b578b443991",
          ExcerciseMemberAdminID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6",
          ExcerciseInfor: [
            {
              ExcerciseName:
                "Xây dựng thái bình thịnh trị ấm no cho muôn dân đế quốc",
              ExcerciseDescription:
                "Xây dựng thái bình thịnh trị ấm no cho muôn dân đế quốc",
              ExcerciseLogo: "/static/media/ggg.8304c57a.PNG"
            }
          ],
          ExcerciseMember: [
            { MemberID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6" },
            { MemberID: "569b6b18-e403-4f34-990a-ebc6f90f2171" },
            { MemberID: "f41fdbc0-0ca7-4777-8d05-9c0fee8900c3" }
          ]
        },
        {
          ExcerciseID: "84c6b250-9980-11eb-9f65-9b578b443991",
          ExcerciseMemberAdminID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6",
          ExcerciseInfor: [
            {
              ExcerciseName:
                "Xây dựng thái bình thịnh trị ấm no cho muôn dân đế quốc",
              ExcerciseDescription:
                "Xây dựng thái bình thịnh trị ấm no cho muôn dân đế quốc",
              ExcerciseLogo: "/static/media/ggg.8304c57a.PNG"
            }
          ],
          ExcerciseMember: [
            { MemberID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6" },
            { MemberID: "569b6b18-e403-4f34-990a-ebc6f90f2171" },
            { MemberID: "f41fdbc0-0ca7-4777-8d05-9c0fee8900c3" }
          ]
        },
        {
          ExcerciseID: "4728a270-9979-11eb-9f65-9b578b443991",
          ExcerciseMemberAdminID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6",
          ExcerciseInfor: [
            {
              ExcerciseName: "kiến tạo quốc viện",
              ExcerciseDescription: "kiến tạo lục viện",
              ExcerciseLogo: "/static/media/kkk.16477550.PNG"
            }
          ],
          ExcerciseMember: [
            { MemberID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6" }
          ]
        },
        {
          ExcerciseID: "1c130670-997e-11eb-9f65-9b578b443991",
          ExcerciseMemberAdminID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6",
          ExcerciseInfor: [
            {
              ExcerciseName: "Kiến tạo chánh phủ",
              ExcerciseDescription: "Kiến tạo chánh phủ trung ương",
              ExcerciseLogo: "/static/media/lll.cba69ff3.PNG"
            }
          ],
          ExcerciseMember: [
            { MemberID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6" }
          ]
        },
        {
          ExcerciseID: "37173950-997e-11eb-9f65-9b578b443991",
          ExcerciseMemberAdminID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6",
          ExcerciseInfor: [
            {
              ExcerciseName: "Suy tôn đại hòang đế đại đế quốc",
              ExcerciseDescription: "suy tôn đại đế",
              ExcerciseLogo: "/static/media/aaa.a1db6d38.PNG"
            }
          ],
          ExcerciseMember: [
            { MemberID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6" },
            { MemberID: "569b6b18-e403-4f34-990a-ebc6f90f2171" }
          ]
        },
        {
          ExcerciseID: "84c6b250-9980-11eb-9f65-9b578b443991",
          ExcerciseMemberAdminID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6",
          ExcerciseInfor: [
            {
              ExcerciseName:
                "Xây dựng thái bình thịnh trị ấm no cho muôn dân đế quốc",
              ExcerciseDescription:
                "Xây dựng thái bình thịnh trị ấm no cho muôn dân đế quốc",
              ExcerciseLogo: "/static/media/ggg.8304c57a.PNG"
            }
          ],
          ExcerciseMember: [
            { MemberID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6" },
            { MemberID: "569b6b18-e403-4f34-990a-ebc6f90f2171" },
            { MemberID: "f41fdbc0-0ca7-4777-8d05-9c0fee8900c3" }
          ]
        },
        {
          ExcerciseID: "84c6b250-9980-11eb-9f65-9b578b443991",
          ExcerciseMemberAdminID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6",
          ExcerciseInfor: [
            {
              ExcerciseName:
                "Xây dựng thái bình thịnh trị ấm no cho muôn dân đế quốc",
              ExcerciseDescription:
                "Xây dựng thái bình thịnh trị ấm no cho muôn dân đế quốc",
              ExcerciseLogo: "/static/media/ggg.8304c57a.PNG"
            }
          ],
          ExcerciseMember: [
            { MemberID: "6a6afc28-167d-4d7d-bb4d-6285b195aec6" },
            { MemberID: "569b6b18-e403-4f34-990a-ebc6f90f2171" },
            { MemberID: "f41fdbc0-0ca7-4777-8d05-9c0fee8900c3" }
          ]
        }
      ],
      NumberExcerciseOnPage: "3",
      NumberIndexExcerciseOnPage: "5",
      CurrentIndexExcercisePage: "1",
      CurrentIndexOfIndexExcercisePage: "1",
      AllNumberOfExcerciseOnPageList: []
    };
  }

  componentDidMount = () => {
    const allNumberOfExcerciseOnPageList = [];
    const ExcerciseListLength = this.state.AllExcercisePublicList.length;

    const allNumberOfExcercise = Math.ceil(
      ExcerciseListLength / Number(this.state.NumberExcerciseOnPage)
    );

    for (let i = 1; i <= allNumberOfExcercise; i++) {
      allNumberOfExcerciseOnPageList.push(i);
    }
    this.setState({
      AllNumberOfExcerciseOnPageList: allNumberOfExcerciseOnPageList
    });
  };

  chooseIndexExcercisePage = event => {
    this.setState({
      CurrentIndexExcercisePage: Number(event.target.id)
    });
  };

  renderIndexOfExcerciseItemList = () => {
    const currentIndexOfIndexExcercisePage = Number(
      this.state.CurrentIndexOfIndexExcercisePage
    );
    const numberIndexExcerciseOnPage = Number(
      this.state.NumberIndexExcerciseOnPage
    );

    const indexOfLastIndexExcerciseList =
      currentIndexOfIndexExcercisePage * numberIndexExcerciseOnPage;

    const indexOfFirstIndexExcerciseList =
      indexOfLastIndexExcerciseList - numberIndexExcerciseOnPage;

    const currentIndexOfChoiceIndexExcerciseList = this.state.AllNumberOfExcerciseOnPageList.slice(
      indexOfFirstIndexExcerciseList,
      indexOfLastIndexExcerciseList
    );

    const allNumberOfIndexOfExcercise = Math.ceil(
      this.state.AllNumberOfExcerciseOnPageList.length /
        numberIndexExcerciseOnPage
    );

    console.log("RA thằng cu này xem sao ", allNumberOfIndexOfExcercise);
    if (allNumberOfIndexOfExcercise === 1) {
      return (
        <div className="user-excercises_all__public-list___control____index-item">
          {currentIndexOfChoiceIndexExcerciseList.map(numberindexitem => (
            <div
              key={numberindexitem}
              id={numberindexitem}
              onClick={event => this.chooseIndexExcercisePage(event)}
            >
              {numberindexitem}
            </div>
          ))}
        </div>
      );
    } else {
      return (
        <div className="user-excercises_all__public-list___control____index-item">
          {currentIndexOfChoiceIndexExcerciseList.map(numberindexitem => (
            <div
              key={numberindexitem}
              id={numberindexitem}
              onClick={event => this.chooseIndexExcercisePage(event)}
            >
              {numberindexitem}
            </div>
          ))}
          <span>...</span>
        </div>
      );
    }
  };

  selectIndexForRenderExcerciseItem = () => {
    return (
      <div className="user-excercises_all__public-list___control">
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
        {this.renderIndexOfExcerciseItemList()}
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
      </div>
    );
  };

  renderChooseIndexExcercisePublicList = () => {
    const currentIndexExcercisePage = Number(
      this.state.CurrentIndexExcercisePage
    );
    const numberExcerciseOnPage = Number(this.state.NumberExcerciseOnPage);

    const indexOfLastExcerciseList =
      currentIndexExcercisePage * numberExcerciseOnPage;

    const indexOfFirstExcerciseList =
      indexOfLastExcerciseList - numberExcerciseOnPage;

    const currentChoiceIndexExcerciseList = this.state.AllExcercisePublicList.slice(
      indexOfFirstExcerciseList,
      indexOfLastExcerciseList
    );

    return (
      <div className="user-excercises_all__public-list___choice-index-content">
        {currentChoiceIndexExcerciseList.map(excerciseitem =>
          excerciseitem.ExcerciseInfor.map(
            (excercisenameitem, excerciseindex) => (
              <div key={excerciseindex}>
                <img
                  style={{
                    height: "120px",
                    width: "120px",
                    margin: "32px 0 0 0"
                  }}
                  alt="team-logo"
                  src={de111}
                />
                <p style={{ fontWeight: "bold" }}>
                  {excercisenameitem.ExcerciseName}
                </p>
              </div>
            )
          )
        )}
      </div>
    );
  };

  render() {
    return (
      <div className="user-excercises_all__public-list">
        <div className="user-excercises_all__public-list___title">
          <p>Bộ đề - Bài tập Công khai</p>
        </div>
        {this.renderChooseIndexExcercisePublicList()}
        {this.selectIndexForRenderExcerciseItem()}
      </div>
    );
  }
}
