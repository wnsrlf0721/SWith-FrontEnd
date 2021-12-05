import styled from 'styled-components';

import React from 'react';

const Timer = ({ hours = 0, minutes = 0, seconds = 0, count = 0 }) => {
  if (count > 1) {
    const total_sec = Number(hours * 3600 + minutes * 60 + seconds);
    const sub_time = parseInt(total_sec / count);
    seconds = sub_time % 60;
    const tnd_time = parseInt(sub_time / 60);
    minutes = tnd_time % 60;
    hours = parseInt(tnd_time / 60);
  }
  if (seconds >= 60) {
    const quo = parseInt(seconds / 60);
    const rem = seconds % 60;
    minutes = Number(minutes + quo);
    seconds = rem;
  }
  if (minutes >= 60) {
    const quo = parseInt(minutes / 60);
    const rem = minutes % 60;
    hours = Number(hours + quo);
    minutes = rem;
  }
  return (
    <div style={{ marginTop: '60px', textAlign: 'center' }}>
      <P>{`${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</P>
    </div>
  );
};

const P = styled.p`
  font-family: Roboto;
  font-size: 22px;
  font-weight: normal;
  color: #595959;
`;

export default Timer;
