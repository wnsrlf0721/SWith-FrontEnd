import styled from 'styled-components';

import {
  getUserCount,
  getUserInfo,
  postFollowRequest,
  getFollowing,
} from '../../api/APIs';
import React, { useEffect, useState } from 'react';
import userImage from '../../images/default_profile_Image.png';

const ViewOtherUser = ({ match }) => {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [followingCount, setFollowingCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [isFollowed, setIsFollowed] = useState(false);
  const [relation, setRelation] = useState(0);
  const [UserimgUrl, setUserimgUrl] = useState(userImage);

  //프로필 UserInfo
  const userId = match.params.userId;

  useEffect(() => {
    getUserInfo(userId)
      .then((response) => {
        const data = response.data;
        if (data.status === '200' && data.message === 'OK') {
          const api_data = data.data;
          if (api_data.imageURL) setUserimgUrl(api_data.imageURL);
          let user = {
            email: api_data.email,
            nickname: api_data.nickname,
            introduce: api_data.introduce,
          };
          setEmail(user.email);
          setNickname(user.nickname);
          setIntroduce(user.introduce);
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
            followerCount: api_data.followerCount,
            postCount: api_data.postCount,
          };
          setFollowerCount(count.followerCount);
          setFollowingCount(count.followingCount);
          setPostCount(count.postCount);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    const userInfo = JSON.parse(window.localStorage.userInfo);
    getFollowing(userInfo.userId)
      .then((response) => {
        const followings = response.data.data.users;
        followings.map((userInfo) => {
          if (userInfo.id === Number(userId)) {
            setIsFollowed(true);
            setRelation(userInfo.approve);
            console.log('이미 요청을 보냇거나 친구인 상태');
          }
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const onFollow = (e) => {
    e.preventDefault();
    //로그인 UserInfo
    const local = JSON.parse(window.localStorage.userInfo);
    postFollowRequest(local.userId, userId)
      .then((response) => {
        alert('팔로우 요청을 성공하였습니다');
        window.location.reload();
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
        <ProfileWrap>
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
              <p>
                팔로워: {followerCount}
                <span style={{ marginLeft: '50px' }}>팔로잉: {followingCount}</span>
              </p>
              <p style={{ display: 'flex' }}>게시글: {postCount}</p>
            </div>
          </InfoWrap>

          <ButtonWrap>
            <a href={`/plan/${userId}`}>
              <Button style={{ color: '#595959' }}>학습관리</Button>
            </a>
            {isFollowed ? (
              relation === 1 ? (
                <Button style={{ backgroundColor: '#ef8585', cursor: 'auto' }} disabled>
                  팔로우 중
                </Button>
              ) : (
                <Button style={{ backgroundColor: '#ef8585', cursor: 'auto' }} disabled>
                  요청 보냄
                </Button>
              )
            ) : (
              <Button style={{ backgroundColor: '#ef8585' }} onClick={(e) => onFollow(e)}>
                팔로우 요청
              </Button>
            )}
          </ButtonWrap>
        </ProfileWrap>
        <IntroWrap>
          <div>
            <p style={{ fontWeight: 'bold' }}>소개 글</p>
          </div>
          {introduce == '' ? (
            <div style={{ color: 'gray' }}>아직 소개 글이 없습니다.</div>
          ) : (
            <div>{introduce}</div>
          )}
        </IntroWrap>
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
  justify-content: flex-start;
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProfileWrap = styled.div`
  display: flex;
`;
const IntroWrap = styled.div`
  margin: 0 80px;
  max-width: 600px;
`;

const PictureWrap = styled.div`
  height: 150px;
  width: 150px;
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
