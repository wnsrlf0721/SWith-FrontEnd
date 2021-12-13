import React, { useEffect } from 'react';

const OtherProfileBeforePage = ({ match }) => {
  useEffect(() => {
    window.location.href = `/profile/${match.params.userId}/otheruser`;
  }, []);
  return <></>;
};

export default OtherProfileBeforePage;
