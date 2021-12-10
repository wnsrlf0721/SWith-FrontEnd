import './css/FriendModal.css';

import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getFollowing,
  deleteFollow,
  getFollower,
  postFollowRequest,
  postFollowApprove,
} from '../../api/APIs';

import defaultProfile from '../../images/default_profile_Image.png';

const FriendModal = ({ closeModal }) => {
  const userInfo = JSON.parse(window.localStorage.userInfo);
  const [swapleft, setSwapleft] = useState(true);
  const [friends, setFriends] = useState([]);
  const [followerLists, setFollowerLists] = useState([]);

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

      deleteFollow(userInfo.userId, id)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          alert('삭제하는데 오류가 생겼습니다.');
          console.log(error);
        });
    }
  };

  const followerRefuse = (id) => {
    if (window.confirm('팔로우 요청을 거절하시겠습니까?')) {
      setFollowerLists(
        followerLists.map((user) => (user.id === id ? { ...user, approve: 2 } : user)),
      );
      console.log(userInfo.userId);
      deleteFollow(id, userInfo.userId)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const followerApprove = (id) => {
    setFollowerLists(
      followerLists.map((user) =>
        user.id === id ? { ...user, approve: !user.approve } : user,
      ),
    );
    postFollowApprove(id, userInfo.userId)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const userInfo = JSON.parse(window.localStorage.userInfo);
    // console.log(userInfo.userId);
    // postFollowRequest(22, userInfo.userId)
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

    getFollower(userInfo.userId).then((response) => {
      const followers = response.data.data.users;
      setFollowerLists(followers);
    });
    console.log();
  }, []);

  const getUserProfile = (user) => {
    return (
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
        <div className="text" style={{ maxWidth: '140px', overflow: 'hidden' }}>
          {user.nickname}
        </div>
      </div>
    );
  };

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
                팔로잉
              </button>
              <button
                className={swapleft === false ? 'friendTapActive' : 'friendTap'}
                onClick={() => setSwapleft(false)}
              >
                팔로워
              </button>
            </div>
            {swapleft ? (
              <div className="friendsWrap">
                {friends.map((user, index) => {
                  if (user.approve == 1) {
                    return (
                      <div className="userWrap">
                        {getUserProfile(user)}
                        <div className="rowWrap">
                          <div className="StudiesTabListWrap">
                            <button
                              className={user.approve == true ? 'pinkBtn' : 'whiteBtn'}
                              onClick={() => changeFollowState(user.id)}
                            >
                              팔로잉 삭제
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            ) : (
              <div className="friendsWrap">
                {followerLists.map((user, index) => {
                  if (user.approve == 0) {
                    return (
                      <div className="userWrap">
                        {getUserProfile(user)}
                        <div className="rowWrap">
                          <div className="StudiesTabListWrap">
                            <div>
                              <button
                                className="pinkBtn"
                                onClick={() => followerApprove(user.id)}
                              >
                                수락
                              </button>
                              <button
                                className="whiteBtn"
                                onClick={() => followerRefuse(user.id)}
                              >
                                거절
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
                {followerLists.map((user, index) => {
                  if (user.approve == 1) {
                    return <div className="userWrap">{getUserProfile(user)}</div>;
                  }
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendModal;
