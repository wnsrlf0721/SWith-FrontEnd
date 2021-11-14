import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../../api/defaultaxios";
import Chart from "react-apexcharts";
import moment from "moment";
import Timer from "./Timer";

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
  color: #595959;
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

const Statistics = ({ task }) => {
  const date = moment().format("YYYY-MM-DD"); //현재 날짜
  const Today = moment(date);
  // 공부시간 기록
  const [todaytime, setTodaytime] = useState({
    hour: 0,
    minute: 0,
    second: 0,
    count: 0,
  });

  const [weektime, setWeektime] = useState({
    hour: 0,
    minute: 0,
    second: 0,
    count: 0,
  });

  const [monthtime, setMonthtime] = useState({
    hour: 0,
    minute: 0,
    second: 0,
    count: 0,
  });

  // 달성률 기록
  const [todaycomp, setTodaycomp] = useState(0);
  const [tcCount, setTcCount] = useState(0);

  const [weekcomp, setWeekcomp] = useState(0);
  const [wcCount, setWcCount] = useState(0);

  const [monthcomp, setMonthcomp] = useState(0);
  const [mcCount, setMcCount] = useState(0);

  useEffect(() => {
    const userInfo = JSON.parse(window.sessionStorage.userInfo);

    //공부시간
    axios
      .get(`/statistics/${userInfo.userId}`)
      .then((response) => {
        const datas = response.data.data;
        console.log(datas);
        datas.map((data) => {
          //일간, 주간, 월간 공부시간 기록
          const D_date = moment(data.date);
          console.log(D_date);
          const Diff = Math.abs(Today.diff(D_date, "days"));

          const hour = Number(data.studyTime.slice(0, 2));
          const minute = Number(data.studyTime.slice(3, 5));
          const second = Number(data.studyTime.slice(6, 8));

          if (Today.month() + 1 === D_date.month() + 1) {
            if (Today.week() === D_date.week()) {
              //오늘의 공부시간
              if (Diff === 0) {
                setTodaytime((prevmonth) => ({
                  ...prevmonth,
                  hour: prevmonth.hour + hour,
                  minute: prevmonth.minute + minute,
                  second: prevmonth.second + second,
                  count: prevmonth.count + 1,
                }));
              }
              //주간 공부시간
              setWeektime((prevmonth) => ({
                ...prevmonth,
                hour: prevmonth.hour + hour,
                minute: prevmonth.minute + minute,
                second: prevmonth.second + second,
                count: prevmonth.count + 1,
              }));
            }
            //월간 공부시간
            setMonthtime((prevmonth) => ({
              ...prevmonth,
              hour: prevmonth.hour + hour,
              minute: prevmonth.minute + minute,
              second: prevmonth.second + second,
              count: prevmonth.count + 1,
            }));
          }
        });
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
    //달성률
    task.map((event) => {
      const D_event = moment(event.start);
      console.log(event);
      const Diff = Today.diff(D_event.format("YYYY-MM-DD"), "days");
      if (Today.month() + 1 === D_event.month() + 1) {
        if (Today.week() === D_event.week()) {
          //오늘의 달성률
          if (Diff === 0) {
            setTodaycomp((todaycomp) => todaycomp + event.complete);
            setTcCount((tcCount) => tcCount + 1);
          }
          //주간 달성률
          setWeekcomp((weekcomp) => weekcomp + event.complete);
          setWcCount((wcCount) => wcCount + 1);
        }
        //월간 달성률
        setMonthcomp((monthcomp) => monthcomp + event.complete);
        setMcCount((mcCount) => mcCount + 1);
      }
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
                <Timer
                  hours={todaytime.hour}
                  minutes={todaytime.minute}
                  seconds={todaytime.second}
                  count={todaytime.count}
                />
              </div>
            </Box>
            <Box>
              <div>
                <Label>오늘의 달성률</Label>
                <Progress
                  done={
                    tcCount === 0
                      ? 0
                      : Math.round(Number(todaycomp / tcCount) * 100)
                  }
                />
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
                <Timer
                  hours={weektime.hour}
                  minutes={weektime.minute}
                  seconds={weektime.second}
                  count={weektime.count}
                />
              </div>
            </Box>
            <Box style={{ width: "200px" }}>
              <div>
                <Label>주간 총 공부시간</Label>
                <Timer
                  hours={weektime.hour}
                  minutes={weektime.minute}
                  seconds={weektime.second}
                  count="1"
                />
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
                <Progress
                  done={
                    wcCount === 0
                      ? 0
                      : Math.round(Number(weekcomp / wcCount) * 100)
                  }
                />
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
                <Timer
                  hours={monthtime.hour}
                  minutes={monthtime.minute}
                  seconds={monthtime.second}
                  count={monthtime.count}
                />
              </div>
            </Box>
            <Box style={{ width: "200px" }}>
              <div>
                <Label>월간 총 공부시간</Label>
                <Timer
                  hours={monthtime.hour}
                  minutes={monthtime.minute}
                  seconds={monthtime.second}
                  count="1"
                />
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
                <Progress
                  done={
                    mcCount === 0
                      ? 0
                      : Math.round(Number(monthcomp / mcCount) * 100)
                  }
                />
              </div>
            </Box>
          </BoxPage>
        </PartPage>
      </StatsPage>
    </Container>
  );
};

export default Statistics;
