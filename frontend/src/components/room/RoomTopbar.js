import React from "react";
import styled from "styled-components";
import user_icon from "../../images/user_icon.png";
import user_icon3x from "../../images/user_icon_3x.png";
import camera from "../../images/camera_true.png";
import mic from "../../images/mic_true.png";
import speaker from "../../images/speaker_true.png";



const Bar = styled.div`
  width: 100%;
  height: 30px;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 17px 40px 17px 20px;
  background-color: #363740;
  position: fixed;
`;
const NamePeopleNumBox = styled.div`
    width: 215px;
    height: 26px;
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 25px;
    padding: 0 0 0 65px;
`;

const MicSpeakerCameraBox = styled.div`
    width: 150px;
    height: 24px;
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 37px;
    padding: 0;
`;

const Container = styled.div`
  width: 100%;
  height: 64px;
  margin: 0 0 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  border: 1px solid #cccccc;
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  padding: 0px;

  width: 1100px;
`;

const Link = styled.ul`
  width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  a {
    font-size: 17px;
    font-weight: 400;
    font-family: "Roboto";
    color: #828282;
    line-height: 20px;
    padding: 0 6px;
    text-decoration: none;
    display: block;
  }
`;
const Search = styled.form`
  display: flex;
  align-items: center;
`;
const Input = styled.input`
  width: 240px;
  border-radius: 30px;
  border: 1px solid #eee;
  padding: 11px 22px 11px 44px;
  background: url(srh_icon) no-repeat center left 16px/16px auto;
  font-size: 14px;
  font-family: "Roboto";
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: 20px;

  /* Inside Auto Layout */
  flex: none;
  flex-grow: 0;
  .login {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 10px;
    position: static;
    width: 70px;
    height: 33px;
    left: 0px;
    top: 3.5px;
    /* primary */

    background: #ef8585;
    border-radius: 100px;

    /* Inside Auto Layout */
    font-family: "Roboto";
    flex: none;
    order: 0;
    flex-grow: 0;
    font-size: 17px;
    line-height: 20px;
    text-decoration: none;
    color: #fafafa;
  }
  .rLink {
    font-size: 17px;
    font-family: Roboto;
    color: #ef8585;
    font-weight: 700;
    text-decoration: none;
    padding: 0 6px;
  }
`;

const RoomTopbar = () => {
  const isLogined = window.sessionStorage.userInfo == null ? false : true;

  return (
    <Bar>
        <NamePeopleNumBox>
            <p>스터디룸 이름 나중에 수정</p>
            <img src = {user_icon} alt = "userIcon"/>
            <h3>3명 나중에 수정</h3>
        </NamePeopleNumBox>
        <MicSpeakerCameraBox>
            <img src = {mic} alt = "mic"/>
            <img src = {camera} alt = "camera"/>
            <img src = {speaker} alt ="speaker"/>
        </MicSpeakerCameraBox>
        <div style={{paddingRight : "30px", marginRight : "20px"}}>
            <img src = {user_icon} alt = "userIcon"/>
        </div>
     
    </Bar>
  );
};

export default RoomTopbar;
