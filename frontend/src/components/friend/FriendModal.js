import { React, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './FriendModal.css';

import defaultProfile from '../../images/default_profile_Image.png';
//{ className, visible, maskClosable, onClose }
const FriendModal = ({ closeModal }) => {
  const [friends, setFriends] = useState([
    {
      id: '1',
      name: '사용자1',
      follow: true,
    },
    {
      id: '2',
      name: '사용자2',
      follow: true,
    },
    {
      id: '3',
      name: '사용자3',
      follow: true,
    },
    {
      id: '4',
      name: '사용자4',
      follow: true,
    },
    {
      id: '5',
      name: '사용자5',
      follow: true,
    },
    {
      id: '6',
      name: '사용자3',
      follow: true,
    },
    {
      id: '7',
      name: '사용자4',
      follow: true,
    },
    {
      id: '8',
      name: '사용자5',
      follow: true,
    },
  ]);

  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  const changeFollowState = (id) => {
    // followState.map((x) => {
    //   if (x.id == id) {
    //     const tempFollower =
    //     setFollowState(!followState);
    //   }
    setFriends(
      friends.map((user) => (user.id === id ? { ...user, follow: !user.follow } : user)),
    );
  };

  // useEffect(() => {

  // }, []);
  return (
    <>
      <div className="ModalWrapper" onClick={onCloseModal}>
        <div className="modalInner">
          <div className="friendModalWrap">
            {/* <div className="closeBtn" onClick={closeModal}>
              닫기
            </div> */}
            <div className="friendHeader">
              <div className="friendTapActive">친구</div>
              <div className="friendTap">친구 요청</div>
            </div>
            <div className="friendsWrap">
              {/* <div className="userWrap">
                <div className="rowWrap"></div>
                <div className="rowWrap"></div>
              </div> */}
              {friends.map((user, index) => {
                return (
                  <div className="userWrap">
                    <div className="rowWrap">
                      <div className="profile">
                        {/* <Link
                          to={{
                            pathname: `/profile/${user.userId}/other`,
                          }}
                          target="_blank"
                          rel="noopener noreferrer"
                        > */}
                        <img
                          style={{
                            height: '30px',
                            width: 'auto',
                            objectFit: 'cover',
                          }}
                          src={defaultProfile}
                          alt="defaultProfile"
                        />
                        {/* </Link> */}
                      </div>
                      <div
                        className="text"
                        style={{ maxWidth: '140px', overflow: 'hidden' }}
                      >
                        {user.name}
                      </div>
                    </div>
                    <div className="rowWrap">
                      <div className="StudiesTabListWrap">
                        <button
                          className={user.follow === true ? 'pinkBtn' : 'whiteBtn'}
                          onClick={() => changeFollowState(user.id)}
                        >
                          {/* {number} */}
                          팔로잉
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// function Index() {
//   useEffect(() => {
//     const isLogined = window.sessionStorage.userInfo == null ? false : true;
//     if (!isLogined) {
//       alert("로그인이 필요합니다.");
//       return (window.location.href = "/login");
//     }
//   }, []);
//   return (
//     <>
//       <Topbar />
//       <div style={{ position: "relative", marginTop: "64px" }}>
//         <h1>팔로우 페이지</h1>
//       </div>
//     </>
//   );
// }

export default FriendModal;
