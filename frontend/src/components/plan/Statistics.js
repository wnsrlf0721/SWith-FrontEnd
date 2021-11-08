import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../../api/defaultaxios";

const Container = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  margin-top: 20px;
`;
const StatsPage = styled.div`
  display: flex;
  position: relative;
  width: 1224px;
  margin: 0 auto;
  padding: 25px 61px 50px;
  border-radius: 13px;
  background-color: #ededed;
  text-align: left;
  flex-direction: column;
`;

const PartPage = styled.div`
  text-align: left;
`;
const BoxPage = styled.div`
  flex-direction: row;
`;
const Box = styled.div`
  display: inline-block;
  margin: 20px;
  padding: 40px 20px;
  height: 200px;
  border-radius: 13px;
  background-color: #fafafa;
  flex-direction: column;
  justify-content: space-between;
`;

const Label = styled.label`
  font-family: Roboto;
  font-size: 17px;
  font-weight: bold;
  text-align: left;
  width: 100%;
  color: #595959;
`;

const Statistics = () => {
  const [todayStudy, setTodayStudy] = useState(0);
  const [weekStudy, setWeekStudy] = useState(0);
  const [monthStudy, setMonthStudy] = useState(0);

  useEffect(() => {
    const userInfo = JSON.parse(window.sessionStorage.userInfo);
    axios
      .get(`/statistics/${userInfo.userId}`)
      .then((response) => {
        const data = response.data;
        console.log(data);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  }, []);

  return (
    <Container>
      <StatsPage>
        <PartPage>
          <h1 style={{ display: "flex" }}>일간</h1>
          <BoxPage>
            <Box>
              <Label>오늘의 공부시간</Label>
            </Box>
            <Box>
              <Label>오늘의 달성률</Label>
            </Box>
          </BoxPage>
        </PartPage>
        <PartPage>
          <h1 style={{ display: "flex" }}>주간</h1>
          <BoxPage>
            <Box>
              <Label style={{ margin: "20px" }}>주간 평균 공부시간</Label>
              <Label style={{ margin: "20px" }}>주간 총 공부시간</Label>
            </Box>
            <Box>
              <Label>주간 달성률</Label>
            </Box>
            <Box>
              <Label>주간 평균 달성률</Label>
            </Box>
          </BoxPage>
        </PartPage>
        <PartPage>
          <h1 style={{ display: "flex" }}>월간</h1>
          <BoxPage>
            <Box>
              <Label style={{ margin: "20px" }}>월간 평균 공부시간</Label>
              <Label style={{ margin: "20px" }}>월간 총 공부시간</Label>
            </Box>
            <Box>
              <Label>월간 달성률</Label>
            </Box>
            <Box>
              <Label>월간 평균 달성률</Label>
            </Box>
          </BoxPage>
        </PartPage>
      </StatsPage>
    </Container>
  );
};

export default Statistics;
