import { React, useState } from 'react';
import './css/FriendModal.css';

import defaultProfile from '../../images/default_profile_Image.png';

const FriendModal = ({ closeModal }) => {
  const [swapleft, setSwapleft] = useState(true);
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
    setFriends(
      friends.map((user) => (user.id === id ? { ...user, follow: !user.follow } : user)),
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
                return (
                  <div className="userWrap">
                    <div className="rowWrap">
                      <div className="profile">
                        <img
                          style={{
                            height: '30px',
                            width: 'auto',
                            objectFit: 'cover',
                          }}
                          src={defaultProfile}
                          alt="defaultProfile"
                        />
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
                        {swapleft ? (
                          <button
                            className={user.follow === true ? 'pinkBtn' : 'whiteBtn'}
                            onClick={() => changeFollowState(user.id)}
                          >
                            팔로잉 삭제
                          </button>
                        ) : (
                          <div>
                            <button
                              className={user.follow === true ? 'pinkBtn' : 'whiteBtn'}
                              onClick={() => changeFollowState(user.id)}
                            >
                              수락
                            </button>
                            <button
                              className={user.follow === true ? 'pinkBtn' : 'whiteBtn'}
                              onClick={() => changeFollowState(user.id)}
                            >
                              거절
                            </button>
                          </div>
                        )}
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

export default FriendModal;
