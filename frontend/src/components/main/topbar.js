import React from "react";
import styled from "styled-components";
import logo from "../../images/logo.png";
import DM_icon from "../../images/DM_icon.png";

const Bar = styled.div`
  width: 100%;
  background: #ffffff;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
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

  width: 278px;

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
`;

const topbar = () => {
  return (
    <Bar>
      <Container>
        <Left>
          <a href="/">
            <img
              style={{ maxHeight: "50px", height: "40px", width: "90px" }}
              src={logo}
              alt="logo"
            />
          </a>
          <Link>
            <a href="/">홈</a>
            <a href="/plan">공부기록</a>
            <a href="/comm">커뮤니티</a>
            <a href="/friend">친구</a>
            <a href="/UserProfile">유저프로필사진</a>
          </Link>
          <Search>
            <Input type="text" placeholder="스터디 검색" class="srh" />
          </Search>
        </Left>
        <Right>
          <a
            href="/mk_room"
            style={{
              fontSize: "17px",
              fontFamily: "Roboto",
              color: "#EF8585",
              fontWeight: "700",
              textDecoration: "none",
            }}
          >
            스터디 만들기
          </a>
          <a href="/dm">
            <img
              style={{ height: "18px", width: "18px" }}
              src={DM_icon}
              alt="DM_icon"
            />
          </a>
          <a href="/login" class="login">
            로그인
          </a>
        </Right>
      </Container>
    </Bar>
  );
};

export default topbar;
