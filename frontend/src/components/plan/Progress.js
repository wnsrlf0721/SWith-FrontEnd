import { React } from "react";
import styled from "styled-components";

const ProgressBar = styled.div`
  background-color: #d8d8d8;
  border-radius: 20px;
  position: relative;
  height: 30px;
  width: 100%;
`;
const ProgressDone = styled.div`
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
      <ProgressDone style={{ width: `${done}%` }}>{done}%</ProgressDone>
    </ProgressBar>
  );
};

export default Progress;
