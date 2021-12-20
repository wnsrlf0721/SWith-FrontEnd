import styled from 'styled-components';

import React, { useState, useEffect } from 'react';
import TutorialModal from './TutorialModal';
import FriendModal from '../Follow/FriendModal';
import AdminModal from './AdminModal';

import logo from '../../images/SWith_logo2.svg';
import DM_icon from '../../images/DM_icon.png';
import search_icon from '../../images/search_gray.png';
import friend_icon from '../../images/heart_default.png';
import infoIcon from '../../images/info_icon.svg';

const Topbar = ({ pageName }) => {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [tutoModalVisible, setTutoModalVisible] = useState(false);
  const [adminModalVisible, setAdminModalVisible] = useState(false);
  const [userId, setUserId] = useState(0);
  const isLogined = window.localStorage.userInfo == null ? false : true;
  useEffect(() => {
    if (isLogined) {
      const userInfo = JSON.parse(window.localStorage.userInfo);
      setUserId(userInfo.userId);
    }
  }, []);
  const closeModal = (type) => {
    if (type === 'friend') {
      setModalVisible(!modalVisible);
    } else if (type === 'tutorial') {
      setTutoModalVisible(!tutoModalVisible);
    }
  };

  const closeAdminModal = () => {
    setAdminModalVisible(!adminModalVisible);
  };

  const onsearch = (e) => {
    e.preventDefault();
    if (search.length > 1) {
      window.location.href = `/?search=${search}`;
    } else {
      alert(`검색어는 2자 이상 필요합니다.`);
    }
  };
  const onLogout = (e) => {
    alert('로그아웃 하였습니다.');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('enteredStudyRoom');
    return (window.location.href = '/');
  };
  const getTutorial = () => {
    if (pageName === 'Main') {
      return (
        <div style={{ width: '23px', height: '23px' }}>
          <img
            src={infoIcon}
            onClick={() => closeModal('tutorial')}
            style={{ cursor: 'pointer' }}
          ></img>
          {tutoModalVisible && (
            <TutorialModal
              visible={tutoModalVisible}
              closable={true}
              maskClosable={true}
              onClose={() => closeModal('tutorial')}
            ></TutorialModal>
          )}
        </div>
      );
    }
  };

  return (
    <Bar>
      <Container>
        <Left>
          <a href="/">
            <img
              style={{
                maxHeight: '50px',
                height: '40px',
                width: '90px',
              }}
              src={logo}
              alt="logo"
            />
          </a>
          <Link>
            <a href="/">홈</a>
            {isLogined ? (
              <a href={`/plan/${userId}`}>학습관리</a>
            ) : (
              <a href={`/login`}>학습관리</a>
            )}
            <a href="/comm">커뮤니티</a>
          </Link>
          <Search onSubmit={(e) => onsearch(e)}>
            <Inputdiv>
              <img
                style={{
                  height: '18px',
                  width: '18px',
                  padding: '0 12px',
                  verticalAlign: 'middle',
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
          {getTutorial()}
          <a className="rLink" href="/MakeRoom">
            스터디 만들기
          </a>
          {/* <a href="/dm">
            <img
              style={{ height: '20px', width: '20px', padding: '8px' }}
              src={DM_icon}
              alt="DM_icon"
            />
          </a> */}
          {!isLogined ? (
            <a href="/login" className="login">
              로그인
            </a>
          ) : (
            <div style={{ gap: '15px', display: 'flex', alignItems: 'center' }}>
              <img
                style={{
                  height: '25px',
                  width: '25px',
                  padding: '5.5px',
                  cursor: 'pointer',
                }}
                src={friend_icon}
                alt="friend_icon"
                onClick={() => closeModal('friend')}
              />
              {modalVisible && (
                <FriendModal closeModal={() => closeModal('friend')}></FriendModal>
              )}
              <button
                style={
                  JSON.parse(window.localStorage.userInfo).name === 'admin@swith.ml'
                    ? {
                        border: 'none',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                      }
                    : { display: 'none' }
                }
                className="rLink"
                onClick={closeAdminModal}
              >
                관리자
              </button>
              {adminModalVisible && (
                <AdminModal closeModal={closeAdminModal}></AdminModal>
              )}
              <a href="/profile" className="rLink">
                프로필
              </a>
              <button
                style={{
                  border: 'none',
                  backgroundColor: 'white',
                  cursor: 'pointer',
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

const Bar = styled.div`
  width: 100%;
  background: #ffffff;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  min-width: max-content;
`;

const Container = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #cccccc;
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60%;
  margin-left: 20px;
`;

const Link = styled.ul`
  //margin: 0 auto;
  display: flex;
  align-items: center;
  width: 30%;
  justify-content: space-between;
  min-width: max-content;
  //gap: 5px;

  a {
    width: max-content;
    font-size: 17px;
    font-weight: 400;
    font-family: 'Roboto';
    color: #828282;
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
  font-family: 'Roboto';
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  // justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-right: 20px;

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
    font-family: 'Roboto';
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
