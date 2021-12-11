import styled from 'styled-components';

import { getUserInfo, getUserCount } from '../../api/APIs';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import userImage from '../../images/default_profile_Image.png';

const View = () => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [followingCount, setFollowingCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [UserimgUrl, setUserimgUrl] = useState(userImage);
  const local = JSON.parse(window.localStorage.userInfo);

  useEffect(() => {
    getUserInfo(local.userId)
      .then((response) => {
        const data = response.data;
        if (data.status === '200' && data.message === 'OK') {
          const api_data = data.data;
          if (api_data.imageURL) setUserimgUrl(api_data.imageURL);
          let user = {
            email: api_data.email,
            nickname: api_data.nickname,
          };
          setEmail(user.email);
          setNickname(user.nickname);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    getUserCount(local.userId)
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.status === '200' && data.message === 'OK') {
          const api_data = data.data;
          console.log(api_data);
          let count = {
            followingCount: api_data.followingCount,
            followerCount: api_data.followerCount,
            postCount: api_data.postCount,
          };
          setFollowerCount(count.followerCount);
          setFollowingCount(count.followingCount);
          setPostCount(count.postCount);
          console.log(followerCount);
          console.log(followingCount);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <ProfileWrap>
        <PictureWrap>
          <ProfilePicture>
            <ProfileImg>
              <img src={UserimgUrl} alt="기본사용자이미지" />
            </ProfileImg>
          </ProfilePicture>
        </PictureWrap>

        <InfoWrap>
          <TextB style={{ marginBottom: '10px' }}>
            <h2>{email}</h2>
            <h3 style={{ fontSize: '20px' }}>{nickname}</h3>
          </TextB>

          <div>
            <p>
              팔로우: {followerCount}
              <span style={{ marginLeft: '50px' }}>팔로잉: {followingCount}</span>
            </p>
            <p style={{ display: 'flex' }}>게시글: {postCount}</p>
          </div>
        </InfoWrap>

        <ButtonWrap>
          <Link to="/profile/edit">
            <Button style={{ backgroundColor: '#f8ad1d' }}>프로필 편집</Button>
          </Link>
          <a href={`/plan/${local.userId}`}>
            <Button style={{ color: '#595959' }}>학습관리</Button>
          </a>
        </ButtonWrap>
      </ProfileWrap>
      <IntroWrap></IntroWrap>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  min-height: 800px;
  text-align: left;
  align-items: center;
  flex-direction: column;
  margin-top: 120px;
  justify-content: space-between;
`;

const ProfileWrap = styled.div`
  display: flex;
`;
const IntroWrap = styled.div``;

const PictureWrap = styled.div`
  border-radius: 70%;
  overflow: hidden;
  margin: 50px 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const ProfilePicture = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 70%;
  overflow: hidden;
  margin: 20px;
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
`;

const ButtonWrap = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  margin: 50px 20px;
`;

export default View;
