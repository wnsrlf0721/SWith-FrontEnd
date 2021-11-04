import React , {useState} from "react";
import Topbar from "./topbar";
import "./Index.css"
import StudyCard from './StudyCard'
import studyImage from "../../images/studyImage.jpg";
import styled from "styled-components";

const Container = styled.div`
  padding: 70px 20px 0;
  width: 1200px;
  margin: 0 auto;
`



const StudyList = () => {
    let studyNum = 0;
    const [toggleState,setToggleState] = useState(1);
    const toggleTab = (index) => {
      setToggleState(index);
    }
    const [studyTitle, setStudyTitle] = useState("스윗 스터디룸");
    const addStudyTitle = () => {
      //later
    }
    const [studyHashtag, setStudyHashtag] = useState("#스윗 #SWith");
    const addStudyHashtag = ()=> {
      //later
    }


    

    return (
    <>
      <Topbar />
      <Container>
        <div className = "StudiesContainer">
            <div className = "StudiesHeader"> 
              <div className = "StudiesHeaderTitle">
                <h3 style = {{fontSize:"22px", fontWeight: "700", lineHeight: "30px;"}}>스터디 목록</h3>
                < div className = "StudiesHeaderNum">
                총 {studyNum} 개 스터디
                </div>
              </div>

            </div>
            <div className = "StudiesTabWrap">
              <div className = "StudiesTabListWrap">
                <button className = {toggleState === 1 ? "StudiesButtonActive" : "StudiesButton"} onClick={ () => toggleTab(1)}>
                  전체
                </button>
                <button className = {toggleState === 2? "StudiesButtonActive" : "StudiesButton"} onClick={() => toggleTab(2)}>
                  국가 고시
                </button>
                <button className = {toggleState === 3? "StudiesButtonActive" : "StudiesButton"} onClick={() => toggleTab(3)}>
                  독서
                </button>
                <button className = {toggleState === 4? "StudiesButtonActive" : "StudiesButton"} onClick={() => toggleTab(4)}>
                  수능
                </button>
                <button className = {toggleState === 5? "StudiesButtonActive" : "StudiesButton"} onClick={() => toggleTab(5)}>
                  어학
                </button>
                <button className = {toggleState === 6? "StudiesButtonActive" : "StudiesButton"} onClick={() => toggleTab(6)}>
                  자격증
                </button>
                <button className = {toggleState === 7? "StudiesButtonActive" : "StudiesButton"} onClick={() => toggleTab(7)}>
                  기타
                </button>
    
                
              </div>

            </div>
            <div className = "StudyCardWrap">
            
              <StudyCard title={studyTitle} imgUrl= {studyImage} body={studyHashtag}>
              </StudyCard>
              <StudyCard title={studyTitle} imgUrl= {studyImage} body={studyHashtag}>
              </StudyCard>
              <StudyCard title={studyTitle} imgUrl= {studyImage} body={studyHashtag}>
              </StudyCard>
              <StudyCard title={studyTitle} imgUrl= {studyImage} body={studyHashtag}>
              </StudyCard>
              <StudyCard title={studyTitle} imgUrl= {studyImage} body={studyHashtag}>
              </StudyCard>
              <StudyCard title={studyTitle} imgUrl= {studyImage} body={studyHashtag}>
              </StudyCard>
            </div>
        </div>
      </Container>
    </>
  );
};

export default StudyList;
