import axios from "../../../api/defaultaxios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserImage from "../../../images/default_profile_Image.png";

const Container = styled.div`
  display: flex;
  min-height: 800px;
  text-align: left;
  align-items: center;
  flex-direction: column;
  margin-top: 120px;
  justify-content: space-between;
`; //모든것의 바깥

const Wrap = styled.div`
  display: flex;
`;

const PictureWrap = styled.div`
  border-radius: 70%;
  overflow: hidden;
  margin: 70px 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const ProfileImg = styled.div`
  img {
    width: auto;
    height: 150px;
    object-fit: cover;
  }
`;

const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px 20px;
`;

const TextB = styled.div`
  width: 200px;
  margin: 0 auto;
  font-family: Roboto;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #000;
  margin: 5px 0;
`;

const Button = styled.button`
  align-items: center;
  width: 150px;
  height: 48px;
  margin-top: 30px;
  font-size: 0.95rem;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  border: 0;
  outline: 0;
  text-decoration: none;
`; //폰트 15

const ButtonWrap = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  margin: 50px 20px;
`;

const Index = () => {
  const UserimgUrl = UserImage;
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [following, setFollowing] = useState(0);
  const [boards, setBoards] = useState(0);

  useEffect(() => {
    const session = JSON.parse(window.sessionStorage.userInfo);
    axios
      .get(`/users/${session.userId}`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.status === "200" && data.message === "OK") {
          const api_data = data.data;
          let user = {
            email: api_data.email,
            nickname: api_data.nickname,
            following: api_data.following.length,
            boards: api_data.boards.length,
          };
          setEmail(user.email);
          setNickname(user.nickname);
          setFollowing(user.following);
          setBoards(user.boards);
        }
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  }, []);

  return (
    <Container>
      <Wrap>
        <PictureWrap>
          <ProfileImg>
            <img src={UserimgUrl} alt="기본사용자이미지" />
          </ProfileImg>
        </PictureWrap>

        <InfoWrap>
          <TextB style={{ marginBottom: "15px" }}>
            <h2>{email}</h2>
            <h3 style={{ fontSize: "20px" }}>{nickname}</h3>
          </TextB>

          <div>
            <p>팔로우: {following}</p>
            <p style={{ display: "flex" }}>게시글: {boards}</p>
          </div>
        </InfoWrap>

        <ButtonWrap>
          <Link to="/profile/edit">
            <Button style={{ backgroundColor: "#f8ad1d" }}>프로필 편집</Button>
          </Link>
          <Link to="/plan">
            <Button style={{ color: "#595959" }}>학습관리</Button>
          </Link>
        </ButtonWrap>
      </Wrap>
    </Container>
  );
};
export default Index;
