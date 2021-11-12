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

const Statistics = () => {
  const date = moment().format("YYYY-MM-DD"); //현재 날짜
  const Today = moment(date);
  // 공부시간 기록
  const [todayhour, setTodayhour] = useState(0);
  const [todayminute, setTodayminute] = useState(0);
  const [todaysecond, setTodaysecond] = useState(0);
  const [todaycount, setTodaycount] = useState(0);

  const [weekhour, setWeekhour] = useState(0);
  const [weekminute, setWeekminute] = useState(0);
  const [weeksecond, setWeeksecond] = useState(0);
  const [weekcount, setWeekcount] = useState(0);

  const [monthhour, setMonthhour] = useState(0);
  const [monthminute, setMonthminute] = useState(0);
  const [monthsecond, setMonthsecond] = useState(0);
  const [monthcount, setMonthcount] = useState(0);

  // 달성률 기록

  useEffect(() => {
    const userInfo = JSON.parse(window.sessionStorage.userInfo);
    /* 아래 api 주석 처리부분 해제하고 학습시간, 날짜 입력하면 임의로 추가 가능
    여러 데이터들을 입력해 오늘, 주별, 월별 학습시간이 제대로 나오는지 볼 수 있음*/

    // axios.post("/statistics", {
    //   userId: `${userInfo.userId}`,
    //   studyTime: "03:59:59",
    //   date: "2021-11-12",
    // });
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
                setTodayhour((todayhour) => todayhour + hour);
                setTodayminute((todayminute) => todayminute + minute);
                setTodaysecond((todaysecond) => todaysecond + second);
                setTodaycount((todaycount) => todaycount + 1);
              }
              //주간 공부시간
              setWeekhour((weekhour) => weekhour + hour);
              setWeekminute((weekminute) => weekminute + minute);
              setWeeksecond((weeksecond) => weeksecond + second);
              setWeekcount((weekcount) => weekcount + 1);
            }
            //월간 공부시간
            setMonthhour((monthhour) => monthhour + hour);
            setMonthminute((monthminute) => monthminute + minute);
            setMonthsecond((monthsecond) => monthsecond + second);
            setMonthcount((monthcount) => monthcount + 1);
          }
        });
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
                <Timer
                  hours={todayhour}
                  minutes={todayminute}
                  seconds={todaysecond}
                  count={todaycount}
                />
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
                <Timer
                  hours={weekhour}
                  minutes={weekminute}
                  seconds={weeksecond}
                  count={weekcount}
                />
              </div>
            </Box>
            <Box style={{ width: "200px" }}>
              <div>
                <Label>주간 총 공부시간</Label>
                <Timer
                  hours={weekhour}
                  minutes={weekminute}
                  seconds={weeksecond}
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
                <Timer
                  hours={monthhour}
                  minutes={monthminute}
                  seconds={monthsecond}
                  count={monthcount}
                />
              </div>
            </Box>
            <Box style={{ width: "200px" }}>
              <div>
                <Label>월간 총 공부시간</Label>
                <Timer
                  hours={monthhour}
                  minutes={monthminute}
                  seconds={monthsecond}
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
