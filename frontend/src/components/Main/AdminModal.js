import './css/AdminModal.css';

import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getUsers,
  getStudyRooms,
  deleteStudyRoom,
  patchBanUser,
  patchLiberateUser,
} from '../../api/APIs';
import socket from '../../socket/socket';

import defaultProfile from '../../images/default_profile_Image.png';

const AdminModal = ({ closeModal }) => {
  const userInfo = JSON.parse(window.localStorage.userInfo);
  const [swapleft, setSwapleft] = useState(true);
  const [users, setUsers] = useState([]);
  const [studyRooms, setStudyRooms] = useState([]);

  useEffect(() => {
    getUsers()
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getStudyRooms()
      .then((response) => {
        setStudyRooms(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

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
              src={user.imageURL ? user.imageURL : defaultProfile}
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

  const adminDeleteStudyRoom = (studyRoom) => {
    if (window.confirm(`${studyRoom.title}을 정말 삭제하시겠습니까?`)) {
      deleteStudyRoom(studyRoom.id)
        .then((response) => {
          socket.emit('delete_studyroom', {
            room: studyRoom.id,
          });
          getStudyRooms()
            .then((response) => {
              setStudyRooms(response.data.data);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const banUser = (user) => {
    if (window.confirm(`${user.nickname}님을 정말 정지하시겠습니까?`)) {
      patchBanUser(user.id)
        .then((response) => {
          getUsers()
            .then((response) => {
              setUsers(response.data.data);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const liberateUser = (user) => {
    if (window.confirm(`${user.nickname}님의 정지를 해제하시겠습니까?`)) {
      patchLiberateUser(user.id)
        .then((response) => {
          getUsers()
            .then((response) => {
              setUsers(response.data.data);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const studyRoomInfo = (studyRoom) => {
    return (
      <div className="rowWrap">
        <div className="text" style={{ maxWidth: '140px', overflow: 'hidden' }}>
          {studyRoom.title}
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
                스터디룸 삭제
              </button>
              <button
                className={swapleft === false ? 'friendTapActive' : 'friendTap'}
                onClick={() => setSwapleft(false)}
              >
                사용자 관리
              </button>
            </div>
            {swapleft ? (
              <div className="friendsWrap">
                {studyRooms.map((studyRoom) => {
                  return (
                    <div className="userWrap">
                      {studyRoomInfo(studyRoom)}
                      <div className="rowWrap">
                        <div className="StudiesTabListWrap">
                          <button
                            className="pinkBtn"
                            onClick={() => adminDeleteStudyRoom(studyRoom)}
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="friendsWrap">
                {users.map((user) => {
                  if (user.banned === 0 && user.email !== 'admin@swith.ml') {
                    return (
                      <div className="userWrap">
                        {getUserProfile(user)}
                        <div className="rowWrap">
                          <div className="StudiesTabListWrap">
                            <div>
                              <button className="pinkBtn" onClick={() => banUser(user)}>
                                정지
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
                {users.map((user) => {
                  if (user.banned === 1 && user.email !== 'admin@swith.ml') {
                    return (
                      <div className="userWrap">
                        {getUserProfile(user)}
                        <div className="rowWrap">
                          <div className="StudiesTabListWrap">
                            <div>
                              <button
                                className="whiteBtn"
                                onClick={() => liberateUser(user)}
                              >
                                해제
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
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

export default AdminModal;
