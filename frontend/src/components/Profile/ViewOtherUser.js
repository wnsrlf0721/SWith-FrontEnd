import styled from 'styled-components';

import { getUserCount, getUserInfo, postFollowRequest } from '../../api/APIs';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import userImage from '../../images/default_profile_Image.png';

const ViewOtherUser = ({ match }) => {
  const UserimgUrl = userImage;
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [followingCount, setFollowingCount] = useState(0);
  const [postCount, setPostCount] = useState(0);

  //프로필 UserInfo
  const userId = match.params.userId;

  useEffect(() => {
    getUserInfo(userId)
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.status === '200' && data.message === 'OK') {
          const api_data = data.data;
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
    getUserCount(userId)
      .then((response) => {
        const data = response.data;
        if (data.status === '200' && data.message === 'OK') {
          const api_data = data.data;
          let count = {
            followingCount: api_data.followingCount,
            postCount: api_data.postCount,
          };
          setFollowingCount(count.followingCount);
          setPostCount(count.postCount);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onFollow = (e) => {
    e.preventDefault();
    //로그인 UserInfo
    const local = JSON.parse(window.localStorage.userInfo);
    postFollowRequest(local.userId, userId)
      .then((response) => {
        alert('팔로우 요청을 성공하였습니다');
        console.log(response);
      })
      .catch((error) => {
        alert('팔로우 요청이 실패하였습니다');
        console.log(error);
      });
  };
  return (
    <Container>
      <Wrap>
        <PictureWrap>
          <ProfileImg>
            <img src={UserimgUrl} alt="기본사용자이미지" />
          </ProfileImg>
        </PictureWrap>

        <InfoWrap>
          <TextB style={{ marginBottom: '15px' }}>
            <h2>{email}</h2>
            <h3 style={{ fontSize: '20px' }}>{nickname}</h3>
          </TextB>

          <div>
            <p>팔로우: {followingCount}</p>
            <p style={{ display: 'flex' }}>게시글: {postCount}</p>
          </div>
        </InfoWrap>

        <ButtonWrap>
          <Link to="/plan">
            <Button style={{ color: '#595959' }}>학습관리</Button>
          </Link>
          <Button style={{ backgroundColor: '#ef8585' }} onClick={(e) => onFollow(e)}>
            팔로우 요청
          </Button>
        </ButtonWrap>
      </Wrap>
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
`;

const ButtonWrap = styled.div`
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  margin: 50px 20px;
`;

export default ViewOtherUser;
