import './css/FriendModal.css';

import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getFollowing,
  deleteFollow,
  postFollow,
  postFollowApprove,
} from '../../api/APIs';

import defaultProfile from '../../images/default_profile_Image.png';

const FriendModal = ({ closeModal }) => {
  const [swapleft, setSwapleft] = useState(true);
  const [friends, setFriends] = useState([]);

  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const changeFollowState = (id) => {
    if (window.confirm('정말 친구를 삭제하시겠습니까?')) {
      setFriends(
        friends.map((user) =>
          user.id === id ? { ...user, approve: !user.approve } : user,
        ),
      );
      const userInfo = JSON.parse(window.sessionStorage.userInfo);
      deleteFollow(userInfo.userId, id)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          alert('삭제하는데 오류가 생겼습니다');
          console.log(error);
        });
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(window.sessionStorage.userInfo);
    console.log(userInfo.userId);
    // postFollow(userInfo.userId, 19)
    //   .then((response) => {
    //     const data = response.data;
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log(error.toJSON());
    //   });

    getFollowing(userInfo.userId)
      .then((response) => {
        const followings = response.data.data.users;
        setFriends(followings);
        //console.log(followings);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <>
      <div className="ModalWrapper" onClick={onCloseModal}>
        <div className="modalInner">
          <div className="friendModalWrap">
            <div className="friendHeader">
              <button
                className={swapleft === true ? 'friendTapActive' : 'friendTap'}
                onClick={() => setSwapleft(true)}
              >
                친구
              </button>
              <button
                className={swapleft === false ? 'friendTapActive' : 'friendTap'}
                onClick={() => setSwapleft(false)}
              >
                친구 요청
              </button>
            </div>
            <div className="friendsWrap">
              {friends.map((user, index) => {
                if (user.approve == 1) {
                  return (
                    <div className="userWrap">
                      <div className="rowWrap">
                        <div className="profile">
                          <Link
                            to={{
                              pathname: `/profile/${user.id}/other`,
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              style={{
                                height: '30px',
                                width: 'auto',
                                objectFit: 'cover',
                              }}
                              src={defaultProfile}
                              alt="defaultProfile"
                            />
                          </Link>
                        </div>
                        <div
                          className="text"
                          style={{ maxWidth: '140px', overflow: 'hidden' }}
                        >
                          {user.nickname}
                        </div>
                      </div>
                      <div className="rowWrap">
                        <div className="StudiesTabListWrap">
                          {swapleft ? (
                            <button
                              className={user.approve == true ? 'pinkBtn' : 'whiteBtn'}
                              onClick={() => changeFollowState(user.id)}
                            >
                              팔로잉 삭제
                            </button>
                          ) : (
                            <div>
                              {/* <button
                                className={user.approve === true ? 'pinkBtn' : 'whiteBtn'}
                                onClick={() => changeFollowState(user.id)}
                              >
                                수락
                              </button>
                              <button
                                className={user.approve === true ? 'pinkBtn' : 'whiteBtn'}
                                onClick={() => changeFollowState(user.id)}
                              >
                                거절
                              </button> */}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendModal;
