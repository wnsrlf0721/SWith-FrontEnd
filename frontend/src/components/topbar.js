import React, { useState } from "react";
import styled from "styled-components";
import logo from "../images/logo.png";
import DM_icon from "../images/DM_icon.png";
import search_icon from "../images/search_gray.png";

const Bar = styled.div`
  width: 100%;
  background: #ffffff;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
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
const Inputdiv = styled.div`
  width: 240px;
  height: 40px;
  border-radius: 30px;
  border: 1px solid #eee;
  align-items: center;
  text-align: center;
`;
const Input = styled.input`
  padding: 11px 0 11px 22px;
  border: white;
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
    margin: 0 3px;
  }
`;

const Topbar = () => {
  const isLogined = window.sessionStorage.userInfo == null ? false : true;
  const [search, setSearch] = useState("");

  const onsearch = (e) => {
    e.preventDefault();
    if (search.length > 1) {
      window.location.href = `/?search=${search}`;
    } else {
      alert(`검색어는 2자 이상 필요합니다.`);
    }
  };
  const onLogout = (e) => {
    const data = JSON.parse(window.sessionStorage.userInfo);
    console.log(data);
    alert("로그아웃 하였습니다.");
    sessionStorage.removeItem("userInfo");
    return (window.location.href = "/");
    // axios
    //   .post("/logout", {
    //     email: data.name,
    //   })
    //   .then((response) => {
    //     const result = response.data;
    //     console.log(result);
    //     if (result.status === "200" && result.message === "OK") {
    //       alert("로그아웃 하였습니다.");
    //       sessionStorage.removeItem("userInfo");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error.toJSON());
    //     alert("로그아웃하는데 문제가 발생했습니다.");
    //   });
  };

  return (
    <Bar>
      <Container>
        <Left>
          <a href="/">
            <img
              style={{
                maxHeight: "50px",
                height: "40px",
                width: "90px",
              }}
              src={logo}
              alt="logo"
            />
          </a>
          <Link>
            <a href="/">홈</a>
            <a href="/plan">학습관리</a>
            <a href="/comm">커뮤니티</a>
            <a href="/friend">친구</a>
            {/* <a href="/UserProfile">프로필편집</a> */}
            {/* <a href="/profile">프로필</a> */}
          </Link>
          <Search onSubmit={(e) => onsearch(e)}>
            <Inputdiv>
              <img
                style={{
                  height: "18px",
                  width: "18px",
                  padding: "0 12px",
                  verticalAlign: "middle",
                }}
                src={search_icon}
                alt="search_icon"
              />
              <Input
                type="text"
                value={search}
                placeholder="스터디 검색"
                onChange={(e) => setSearch(e.target.value)}
              />
            </Inputdiv>
          </Search>
        </Left>
        <Right>
          <a className="rLink" href="/MakeRoom">
            스터디 만들기
          </a>
          <a href="/dm">
            <img
              style={{ height: "18px", width: "18px", padding: "0 6px" }}
              src={DM_icon}
              alt="DM_icon"
            />
          </a>
          {!isLogined ? (
            <a href="/login" className="login">
              로그인
            </a>
          ) : (
            <div>
              <a href="/profile" className="rLink">
                프로필
              </a>
              <button
                style={{
                  border: "none",
                  backgroundColor: "white",
                  cursor: "pointer",
                }}
                className="rLink"
                onClick={onLogout}
              >
                로그아웃
              </button>
            </div>
          )}
        </Right>
      </Container>
    </Bar>
  );
};

export default Topbar;
