import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../../api/defaultaxios";
import Chart from "react-apexcharts";

const series_week = [
  {
    name: "Week Complete",
    data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2],
  },
];

const series_month = [
  {
    name: "Month Complete",
    data: [2.3, 3.1, 4.0, 10.1, 4.0],
  },
];

const options = {
  fill: {
    colors: "#ef8585",
  },
  chart: {
    type: "bar",
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      dataLabels: {
        position: "top", // top, center, bottom
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val + "%";
    },
    offsetY: -20,
    style: {
      fontSize: "12px",
      colors: ["#304758"],
    },
  },

  xaxis: {
    categories: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    position: "bottom",
  },
};

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
  display: flex;
  flex-direction: row;
`;
const Box = styled.div`
  display: inline-block;
  margin: 20px;
  padding: 40px 20px;
  height: 200px;
  border-radius: 13px;
  background-color: #fafafa;
  align-items: center;
  flex-direction: column;
`;

const Label = styled.label`
  font-family: Roboto;
  font-size: 17px;
  font-weight: bold;
  text-align: left;
  width: 100%;
  color: #595959;
`;

/********달성률 Progress Bar CSS style********/
const ProgressBar = styled.div`
  background-color: #d8d8d8;
  border-radius: 20px;
  position: relative;
  margin-top: 60px;
  height: 30px;
  width: 300px;
`;
const Progress_done = styled.div`
  background: linear-gradient(to left, #f2709c, #ff9472);
  box-shadow: 0 3px 3px -5px #f2709c, 0 2px 5px #f2709c;
  border-radius: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 0;
  opacity: 0;
  transition: 1s ease 0.3s;
  opacity: 1;
`;
const Progress = ({ done }) => {
  return (
    <ProgressBar>
      <Progress_done style={{ width: `${done}%` }}>{done}%</Progress_done>
    </ProgressBar>
  );
};
/****************************************************/

/**공부시간 표현 CSS**/
const P = styled.p`
  font-family: Roboto;
  font-size: 22px;
  font-weight: normal;
  color: #595959;
`;
const Timer = ({ hours = 0, minutes = 0, seconds = 0 }) => {
  const [time, setTime] = useState({
    hours: parseInt(hours, 10),
    minutes: parseInt(minutes, 10),
    seconds: parseInt(seconds, 10),
  });

  return (
    <div style={{ marginTop: "60px", textAlign: "center" }}>
      <P>{`${time.hours.toString().padStart(2, "0")}:${time.minutes
        .toString()
        .padStart(2, "0")}:${time.seconds.toString().padStart(2, "0")}`}</P>
    </div>
  );
};

const Statistics = () => {
  // 공부시간 기록
  const [todayStudy, setTodayStudy] = useState(0);
  const [weekStudy, setWeekStudy] = useState(0);
  const [monthStudy, setMonthStudy] = useState(0);

  // 달성률 기록

  useEffect(() => {
    const userInfo = JSON.parse(window.sessionStorage.userInfo);
    axios
      .get(`/statistics/${userInfo.userId}`)
      .then((response) => {
        console.log(response);
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
            <Box style={{ width: "200px" }}>
              <div>
                <Label>오늘의 공부시간</Label>
                <Timer hours="0" minutes="9" seconds="0" />
              </div>
            </Box>
            <Box>
              <div>
                <Label>오늘의 달성률</Label>
                <Progress done="70" />
              </div>
            </Box>
          </BoxPage>
        </PartPage>
        <PartPage>
          <h1 style={{ display: "flex" }}>주간</h1>
          <BoxPage>
            <Box style={{ width: "200px" }}>
              <div>
                <Label>주간 평균 공부시간</Label>
                <Timer hours="0" minutes="0" seconds="0" />
              </div>
            </Box>
            <Box style={{ width: "200px" }}>
              <div>
                <Label>주간 총 공부시간</Label>
                <Timer hours="0" minutes="0" seconds="0" />
              </div>
            </Box>
            <Box>
              <div>
                <Label>주간 달성률</Label>
                <Chart
                  options={options}
                  series={series_week}
                  type="bar"
                  height={200}
                />
              </div>
            </Box>
            <Box>
              <div>
                <Label>주간 평균 달성률</Label>
                <Progress done="70" />
              </div>
            </Box>
          </BoxPage>
        </PartPage>
        <PartPage>
          <h1 style={{ display: "flex" }}>월간</h1>
          <BoxPage>
            <Box style={{ width: "200px" }}>
              <div>
                <Label>월간 평균 공부시간</Label>
                <Timer hours="0" minutes="0" seconds="0" />
              </div>
            </Box>
            <Box style={{ width: "200px" }}>
              <div>
                <Label>월간 총 공부시간</Label>
                <Timer hours="0" minutes="0" seconds="0" />
              </div>
            </Box>
            <Box>
              <div>
                <Label>월간 달성률</Label>
                <Chart
                  options={options}
                  series={series_month}
                  type="bar"
                  height={200}
                />
              </div>
            </Box>
            <Box>
              <div>
                <Label>월간 평균 달성률</Label>
                <Progress done="70" />
              </div>
            </Box>
          </BoxPage>
        </PartPage>
      </StatsPage>
    </Container>
  );
};

export default Statistics;
