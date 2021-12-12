import './css/StudyRoom.css';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studyRoomAtoms } from '../recoils';
import { useRecoilState } from 'recoil';
import { getUsers } from '../../api/APIs';

import defaultProfile from '../../images/default_profile_Image.png';
import camera_true from '../../images/camera_default.png';
import camera_false from '../../images/camera_false.png';
import speaker_true from '../../images/speaker_default.png';
import speaker_false from '../../images/speaker_false.png';
import kickout_default from '../../images/kickout_default.png';

const UserList = (
  userId,
  studyRoomID,
  userNickName,
  connnectedUsers,
  setVideoMute,
  setAudioMute,
  userVideoMute,
  userAudioMute,
  masterId,
  maxUserCount,
) => {
  const [imUser, setImUser] = useState([]);
  const [kickOutInfo, setKickOutInfo] = useRecoilState(studyRoomAtoms.kickOutInfo);
  const [openKickOutModal, setOpenKickOutModal] = useRecoilState(
    studyRoomAtoms.openKickOutModal,
  );
  const loginUser = window.localStorage.userInfo;
  const users = [
    {
      userId: userId,
      nickName: userNickName,
    },
  ];
  const [UserimgUrls, setUserimgUrls] = useState(new Map());

  useEffect(() => {
    getUsers()
      .then((response) => {
        const userImgUrl = new Map();
        const data = response.data.data;
        data.map((user) => {
          userImgUrl[user.id] = user.imageURL;
        });
        setUserimgUrls(userImgUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setImUser(users.concat(connnectedUsers));
  }, [connnectedUsers]);

  const videoMute = (userSocketId) => {
    setVideoMute(userSocketId);
  };

  const audioMute = (userSocketId) => {
    setAudioMute(userSocketId);
  };

  const kickOutUser = (userSocketId, userId, userNickName) => {
    setKickOutInfo([userSocketId, userId, studyRoomID, userNickName]);
    setOpenKickOutModal(true);
  };

  return (
    <div className="UserListtWrap">
      <div className="UserList">
        <div className="rowContainer">
          <div className="text" style={{ fontWeight: 'bold' }}>
            참여자 목록
          </div>
          <div className="text" style={{ fontSize: '12px' }}>
            {connnectedUsers.length + 1}/{maxUserCount}
          </div>
        </div>
        <div className="rowContainer">
          <div className="ImgIcon" style={{ height: 'auto' }}></div>
        </div>
      </div>
      <div className="List" style={{ overflow: 'auto' }}>
        {imUser.map((user, index) => {
          return (
            <div className="UserList">
              <div className="rowContainer">
                <div className="profile">
                  {JSON.parse(loginUser)['userId'] === user.userId ? (
                    <Link
                      to={{
                        pathname: '/profile',
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
                        src={
                          UserimgUrls[user.userId]
                            ? UserimgUrls[user.userId]
                            : defaultProfile
                        }
                        alt="defaultProfile"
                      />
                    </Link>
                  ) : (
                    <Link
                      to={{
                        pathname: `/profile/${user.userId}/other`,
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
                        src={
                          UserimgUrls[user.userId]
                            ? UserimgUrls[user.userId]
                            : defaultProfile
                        }
                        alt="defaultProfile"
                      />
                    </Link>
                  )}
                </div>
                <div className="text" style={{ maxWidth: '140px', overflow: 'hidden' }}>
                  {user.nickName}
                </div>
              </div>
              <div className="rowContainer">
                {index !== 0 ? (
                  <>
                    <div
                      className="ImgIcon"
                      style={
                        masterId === userId
                          ? { height: 'auto', cursor: 'default' }
                          : { display: 'none' }
                      }
                    >
                      <img
                        style={{ width: '15px' }}
                        src={kickout_default}
                        alt="kickout_default"
                        onClick={() =>
                          kickOutUser(user.socketId, user.userId, user.nickName)
                        }
                      />
                    </div>
                    <div
                      className="ImgIcon"
                      style={{ height: 'auto', cursor: 'default' }}
                    >
                      <img
                        style={{ width: '15px' }}
                        src={
                          !userVideoMute.get(user.socketId) ? camera_false : camera_true
                        }
                        alt="camera_false"
                        onClick={() => videoMute(user.socketId)}
                      />
                    </div>
                    <div
                      className="ImgIcon"
                      style={{ height: 'auto', cursor: 'default' }}
                    >
                      <img
                        style={{ width: '15px' }}
                        src={
                          !userAudioMute.get(user.socketId) ? speaker_false : speaker_true
                        }
                        alt="mic_false"
                        onClick={() => audioMute(user.socketId)}
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserList;
