import React, { useEffect, useState } from "react";
import styled from "styled-components";

import StudyCard from "./StudyCard";
import studyImage from "../../images/studyImage.jpg";
import exampleList from "./exampleList.json";
import "./bottomPage.css";

const Bottompage = styled.div`
  padding: 70px 20px 0;
  width: 1200px;
  margin: 0 auto;
`;
const category = [
  {
    id: 1,
    purpose: "전체",
  },
  {
    id: 2,
    purpose: "국가 고시",
  },
  {
    id: 3,
    purpose: "독서",
  },
  {
    id: 4,
    purpose: "수능",
  },
  {
    id: 5,
    purpose: "어학",
  },
  {
    id: 6,
    purpose: "자격증",
  },
  {
    id: 7,
    purpose: "기타",
  },
];

const BottomPage = () => {
  const [studyNum, setStudyNum] = useState(0);
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const [studyTitle, setStudyTitle] = useState("스윗 스터디룸");
  const addStudyTitle = () => {
    //later
  };
  const [studyHashtag, setStudyHashtag] = useState("#스윗 #SWith");
  const addStudyHashtag = () => {
    //later
  };

  useEffect(() => {
    const Listlen = exampleList.data.length;
    setStudyNum(Listlen);
  }, []);

  return (
    <Bottompage>
      <div className="StudiesContainer">
        <div className="StudiesHeader">
          <div className="StudiesHeaderTitle">
            <h3
              style={{
                fontSize: "22px",
                fontWeight: "700",
                lineHeight: "30px;",
              }}
            >
              스터디 목록
            </h3>
            <div className="StudiesHeaderNum">총 {studyNum} 개 스터디</div>
          </div>
        </div>

        <div className="StudiesTabWrap">
          <div className="StudiesTabListWrap">
            {category.map((data) => (
              <button
                className={
                  toggleState === data.id
                    ? "StudiesButtonActive"
                    : "StudiesButton"
                }
                onClick={() => toggleTab(data.id)}
              >
                {data.purpose}
              </button>
            ))}
          </div>
        </div>

        <div className="StudyCardWrap">
          {exampleList.data.map((data) => (
            <StudyCard
              title={data.title}
              imgUrl={studyImage}
              body={data.body}
            ></StudyCard>
          ))}
        </div>
      </div>
    </Bottompage>
  );
};

export default BottomPage;
