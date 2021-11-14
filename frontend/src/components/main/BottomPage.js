import React, { useEffect, useState } from "react";
import styled from "styled-components";

import StudyCard from "./StudyCard";
import studyImage from "../../images/studyImage.jpg";
import exampleList from "./exampleList.json";
import "./bottomPage.css";
import axios from "../../api/defaultaxios";

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
    

    //later 배열에 넣고 빼내기
  };
  const [studyHashtag, setStudyHashtag] = useState("#스윗 #SWith");
  const addStudyHashtag = () => {
    // axios
    //   .get("/studyrooms")
    //   .then((response) => {
    //     const datas = response.data
    //     console.log(datas);
    //     datas.map((data)=>{
    //       roomHashtag = roomHashtag.concat({
    //         hashTag : data.hashTag,
    //       })
    //       setStudyHashtag(roomHashtag);
    //     })
        
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    //later
    
  };

  const getStudyTitleHashtag = () => {
    let roomInfo = [];
    axios
      .get("/studyrooms")
      .then((response) => {
        const datas = response.data.data;
        console.log(datas);
        datas.map((data)=>{
          roomInfo = roomInfo.concat({
            title : data.title,
            hashtag : data.hashtags,
          })
          setPosts(roomInfo.reverse());
        })
        
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    getStudyTitleHashtag();

    setStudyNum(exampleList.data.length);
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Bottompage>
      <div className="StudiesContainer">
        <div className="StudiesHeader">
          <div className="StudiesHeaderTitle">
            <h3
              style={{
                fontSize: "22px",
                fontWeight: "700",
                lineHeight: "30px",
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
          {currentPosts.map((data) => {
            return (
              <StudyCard
                title={data.title}
                imgUrl={studyImage}
                body={data.body}
              ></StudyCard>
            );
          })}
        </div>
        <nav>
          {pageNumbers.map((number) => {
            return (
              <button className="Pagebutton" onClick={() => paginate(number)}>
                {number}
              </button>
            );
          })}
        </nav>
      </div>
    </Bottompage>
  );
};

export default BottomPage;
