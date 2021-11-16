import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import BtnPrev from "../../images/Prev.svg";
import BtnNext from "../../images/Next.svg";
import studyImage from "../../images/studyImage.jpg";
import axios from "../../api/defaultaxios";
import Progress from "../plan/Progress";
import moment from "moment";

const Mypage = styled.div`
  display: flex;
  height: 482px;
  padding: 100px 0 0;
  margin: 66px 0 0;
  border: solid 1px #ccc;
  background-color: #fafbfc;
`;

const EmptyBox = styled.div`
  width: 66%;
  height: 310px; //244
  margin: 120px 17% 0 17%;
  //padding: 0 56px 0 0;
  //border: solid 1px #ccc;
  //background-color: #ffffff
`;
const HistoryBox = styled.div`
  width: 216px;
  height: 244px;
  border: solid 1px #ccc;
  background-color: #fafafa;
  border-radius: 5px;
`;

const TextBox = styled.div`
  font-family: Roboto;
  font-size: 22px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000;
`;
const MyPage = () => {
  const [todaystudy, setTodaystudy] = useState({
    hour: 0,
    minute: 0,
    second: 0,
    complete: 0,
    count: 0,
  });
  useEffect(() => {
    const isLogined = window.sessionStorage.userInfo == null ? false : true;
    if (isLogined) {
      const userInfo = JSON.parse(window.sessionStorage.userInfo);
      const date = moment().format("YYYY-MM-DD"); //현재 날짜
      const Today = moment(date);
      axios
        .get(`/statistics/${userInfo.userId}`)
        .then((response) => {
          const datas = response.data.data;
          //console.log(datas);
          datas.map((data) => {
            //일간, 주간, 월간 공부시간 기록
            const D_date = moment(data.date);
            //console.log(D_date);
            const Diff = Math.abs(Today.diff(D_date, "days"));

            const hour = Number(data.studyTime.slice(0, 2));
            const minute = Number(data.studyTime.slice(3, 5));
            const second = Number(data.studyTime.slice(6, 8));

            //오늘의 공부시간
            if (Diff === 0) {
              setTodaystudy((prev) => ({
                ...prev,
                hour: prev.hour + hour,
                minute: prev.minute + minute,
                second: prev.second + second,
              }));
            }
          });
        })
        .catch((error) => {
          console.log(error.toJSON());
        });
      axios
        .get(`/planners/${userInfo.userId}`)
        .then((response) => {
          const data = response.data.data;
          data.studyplanner_Tasks.map((task) => {
            const plan_date = moment(task.startDate);
            const Diff = Math.abs(Today.diff(plan_date, "days"));
            if (Diff === 0) {
              //console.log(task.complete);
              setTodaystudy((prev) => ({
                ...prev,
                complete: prev.complete + task.complete,
                count: prev.complete + 1,
              }));
            }
          });
        })
        .catch((error) => {
          console.log(error.toJSON());
        });
      //참여했던 스터디룸 조회 API
      // axios
      //   .get(`/studyrooms-history/${userInfo.userId}`)
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => {
      //     console.log(error.toJSON());
      //   });
    }
  }, []);
  return (
    <Mypage>
      <EmptyBox style={{ margin: "0 auto", width: "1200px" }}>
        <EmptyBox style={{ margin: "0", width: "60%" }}>
          <Container style={{ margin: "0 0 48px 0", width: "720px" }}>
            <TextBox style={{ fontWeight: "bold", width: "600px" }}>
              내 스터디
            </TextBox>
            <Container
              style={{
                margin: "-37px 0 0 660px",
                width: "60px",
                height: "29px",
              }}
            >
              <img
                style={{ height: "50px", width: "30px" }}
                src={BtnPrev}
                alt="BtnPrev"
              />
              <img
                style={{ height: "50px", width: "30px" }}
                src={BtnNext}
                alt="BtnNext"
              />
            </Container>
          </Container>

          <HistoryBox>
            {/* <HistoryBoxImg/> */}
            <img
              style={{ height: "144px", width: "216px" }}
              src={studyImage}
              alt="studyImage"
            />
            <TextBox
              style={{
                width: "180px",
                height: "70px",
                margin: "15px 18px 0",
                fontSize: "17px",
              }}
            >
              스터디 이름
            </TextBox>
          </HistoryBox>
          <HistoryBox style={{ margin: "-246.6px 250px" }}>
            {/* <HistoryBoxImg/> */}
            <img
              style={{ height: "144px", width: "216px" }}
              src={studyImage}
              alt="studyImage"
            />
            <TextBox
              style={{
                width: "180px",
                height: "70px",
                margin: "15px 18px 0",
                fontSize: "17px",
              }}
            >
              스터디 이름
            </TextBox>
          </HistoryBox>
          <HistoryBox style={{ margin: "0 500px", backgroundColor: "#454648" }}>
            <TextBox
              style={{
                width: "178px",
                height: "60px",
                fontSize: "17px",
                fontWeight: "bold",
                color: "#fafafa",
                margin: "92px 19px",
                textAlign: "center",
              }}
            >
              내가 만든 스터디 또는 초대 받은 스터디가 등록됩니다.
            </TextBox>
          </HistoryBox>
        </EmptyBox>
        <EmptyBox style={{ margin: "-308px 0 0 760px", width: "40%" }}>
          <TextBox style={{ fontWeight: "bold", margin: "0" }}>
            학습 시간
          </TextBox>
          <HistoryBox
            style={{
              width: "508px",
              height: "244px",
              margin: "38px 0 0 0",
              backgroundColor: "#fff",
            }}
          >
            <EmptyBox
              style={{
                justifyContent: "space-between",
                flexDirection: "column",
                flex: "1",
                margin: "39px 28px",
                width: "452px",
                height: "166px",
              }}
            >
              <EmptyBox style={{ width: "100%", height: "44px", margin: "0" }}>
                <TextBox style={{ fontWeight: "bold", fontSize: "12px" }}>
                  오늘 공부한 시간
                </TextBox>
                <TextBox>{`${todaystudy.hour
                  .toString()
                  .padStart(2, "0")}:${todaystudy.minute
                  .toString()
                  .padStart(2, "0")}:${todaystudy.second
                  .toString()
                  .padStart(2, "0")}`}</TextBox>
              </EmptyBox>
              <EmptyBox
                style={{
                  backgroundColor: "#ccc",
                  margin: "35px 0 30px",
                  width: "100%",
                  height: "1px",
                }}
              />
              <EmptyBox
                style={{ width: "100%", height: "58px", margin: "0 0 20px" }}
              >
                <TextBox style={{ fontWeight: "bold", fontSize: "15px" }}>
                  오늘의 할일 달성률
                </TextBox>
                <div style={{ marginTop: "15px" }}>
                  <Progress
                    done={
                      todaystudy.count === 0
                        ? 0
                        : Math.round(
                            Number(todaystudy.complete / todaystudy.count) * 100
                          )
                    }
                  />
                </div>
              </EmptyBox>
            </EmptyBox>
          </HistoryBox>
        </EmptyBox>
      </EmptyBox>
    </Mypage>
  );
};

export default MyPage;
