import './css/StudyRoom.css';
import { useRef, useState, useEffect } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import { useSetRecoilState, useRecoilState } from 'recoil';

import UserVideo from './UserVideo';
import Chat from './Chat';
import StudyRoomModal from './StudyRoomEnterModal';
import LeftBar from './StudyRoomLeftBar';
import UserList from './UserList';
import EnlargeVideoModal from './EnlargeVideoModal';
import { StudyRoomSocket } from '../../socket/studyRoomSocket';
import UserKickedModal from './UserKickedModal';
import UserKickOutModal from './UserKickOutModal';
import StudyRoomReloadModal from './StudyRoomReloadModal';
import ExitAllUsersModal from './ExitAllUsersModal';

import { getStudyRoomInfo, postUserStudyRoomHistory } from '../../api/APIs';
import socket from '../../socket/socket';
import { studyRoomAtoms } from '../recoils';

import user_icon from '../../images/user_icon.png';
import camera_true from '../../images/camera_true.png';
import camera_false from '../../images/camera_false.png';
import mic_true from '../../images/mic_true.png';
import mic_false from '../../images/mic_false.png';
import screen_false from '../../images/screen_false.png';
import screen_true from '../../images/screen_true.png';

const StudyRoom = ({ match }) => {
  const studyRoomId = match.params.studyRoomId;
  const userNickName = match.params.nickName;
  const userInfo = match.params.userInfo;

  const [initSetting, setInitSetting] = useState(false);
  const secTimer = useRef(null);
  const [studyTimer, setStudyTimer] = useState('00:00:00');
  const [timerID, setTimerID] = useState(null);

  const setUserNickName = useSetRecoilState(studyRoomAtoms.userNickName);
  const [connectedUsers, setConnectedUsers] = useRecoilState(
    studyRoomAtoms.connectedUsers,
  );
  const [connectedUserTimer, setConnectedUserTimer] = useRecoilState(
    studyRoomAtoms.connectedUserTimer,
  );
  const [userAudioMute, setUserAudioMute] = useRecoilState(studyRoomAtoms.userVideoMute);
  const [userVideoMute, setUserVideoMute] = useRecoilState(studyRoomAtoms.userAudioMute);
  const [RTCSenders] = useRecoilState(studyRoomAtoms.RTCSenders);

  const [enlargeVideo, setEnlargeVideo] = useRecoilState(studyRoomAtoms.enlargeVideo);
  const [enlargedUserSocketId, setEnlargedUserSocketId] = useRecoilState(
    studyRoomAtoms.enlargedUserSocketId,
  );

  const userVideoRef = useRef(null);
  const [userMedia, setUserMedia] = useState(null);
  const [availableUserMedia, setAvailableUserMedia] = useState(false);

  const [camera, setCamera] = useState(true);
  const [mic, setMic] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [studyRoomInfo, setStudyRoomInfo] = useState([]);
  const [masterId, setMasterId] = useState('');
  const [userId, setUserId] = useState('');
  const [kicked, setKicked] = useRecoilState(studyRoomAtoms.kicked);
  const [openKickOutModal, setOpenKickOutModal] = useRecoilState(
    studyRoomAtoms.openKickOutModal,
  );
  const [openReloadModal, setOpenReloadModal] = useRecoilState(
    studyRoomAtoms.openReloadModal,
  );
  const [openExitAllUsersModal, setOpenExitAllUsersModal] = useRecoilState(
    studyRoomAtoms.openExitAllUsersModal,
  );

  useBeforeunload(async (event) => {
    socket.disconnect();
    window.localStorage.setItem('enteredStudyRoom', 'false');
  });

  useEffect(() => {
    if (!document.referrer) {
      alert('잘못된 접근입니다.');
      return (window.location.href = `/`);
    }
    window.localStorage.setItem('enteredStudyRoom', 'true');
    const userId = JSON.parse(userInfo)['userId'];
    setUserId(userId);
    setUserNickName(userNickName);
    socket.emit('join_room', {
      room: studyRoomId,
      userName: userNickName,
      userId: JSON.parse(userInfo)['userId'],
    });

    postUserStudyRoomHistory(userId, studyRoomId)
      .then((response) => {})
      .catch((error) => {
        console.error(error);
      });

    getStudyRoomInfo(studyRoomId)
      .then((response) => {
        const data = response.data;
        console.log(data);
        setStudyRoomInfo({
          id: data.data.id,
          title: data.data.title,
          maxUserCount: data.data.maxUserCount,
          masterId: data.data.masterId,
          notice: data.data.notice,
        });
        setMasterId(data.data.masterId);

        const sc = data.data.secret;
        const pw = data.data.password;
        let pwTest = '';
        let input = '';
        for (let i = 0; i < 5; i++) {
          if (input == null) window.open('', '_self').close();
          else if (sc === 1 && pwTest !== pw) {
            window.localStorage.setItem('enteredStudyRoom', 'false');
            input = prompt('비밀번호를 입력해주세요');
            pwTest = input;
          } else {
            window.localStorage.setItem('enteredStudyRoom', 'true');
            return;
          }
          if (i > 3) {
            window.open('', '_self').close();
            window.localStorage.setItem('enteredStudyRoom', 'false');
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const initSettings = (useUserVideo, availableUserVideo) => {
    if (availableUserVideo) setUserMedia(userVideoRef.current.srcObject);

    setMic(false);
    setCamera(useUserVideo);
    setAvailableUserMedia(availableUserVideo);
    setInitSetting(true);

    socket.emit('users_in_room', {
      room: studyRoomId,
    });

    let timerID = setInterval(() => {
      secTimer.current += 1;
      let studyTimer = getTime(secTimer.current);
      connectedUserTimer.forEach((value, key) => {
        connectedUserTimer.set(key, value + 1);
      });
      if (!window.localStorage.userInfo) {
        window.open('', '_self').close();
      }
      setConnectedUserTimer(connectedUserTimer);
      setStudyTimer(studyTimer);
    }, 1000);

    setTimerID(timerID);
  };

  const getTime = (seconds) => {
    var hour =
      parseInt(seconds / 3600) < 10
        ? '0' + parseInt(seconds / 3600)
        : parseInt(seconds / 3600);
    var min =
      parseInt((seconds % 3600) / 60) < 10
        ? '0' + parseInt((seconds % 3600) / 60)
        : parseInt((seconds % 3600) / 60);
    var sec = seconds % 60 < 10 ? '0' + (seconds % 60) : seconds % 60;
    return hour + ':' + min + ':' + sec;
  };

  const videoMute = () => {
    if (!availableUserMedia) return;
    userVideoRef.current.srcObject.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setCamera(track.enabled);
    });
  };

  const audioMute = () => {
    if (!availableUserMedia) return;
    userMedia.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
    setMic(!mic);
  };

  const setVideoMute = (userSocketId) => {
    setUserVideoMute(
      new Map(userVideoMute.set(userSocketId, !userVideoMute.get(userSocketId))),
    );
  };

  const setAudioMute = (userSocketId) => {
    setUserAudioMute(
      new Map(userAudioMute.set(userSocketId, !userAudioMute.get(userSocketId))),
    );
  };

  const sharingScreen = () => {
    if (sharing) stopSharingScreen();
    else startSharingScreen();
  };

  const startSharingScreen = () => {
    navigator.mediaDevices
      .getDisplayMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        stream.getVideoTracks()[0].addEventListener('ended', () => {
          if (userMedia && userVideoRef.current)
            userVideoRef.current.srcObject = userMedia;
          if (connectedUsers.length > 0) {
            userMedia.getTracks().forEach((track) => {
              connectedUsers.map((user) => {
                RTCSenders.get(user.socketId).replaceTrack(track);
              });
            });
            userMedia.getVideoTracks().forEach((track) => {
              setCamera(track.enabled);
            });
          }
          setSharing(false);
        });

        if (connectedUsers.length > 0) {
          stream.getTracks().forEach((track) => {
            connectedUsers.map((user) =>
              RTCSenders.get(user.socketId).replaceTrack(track),
            );
          });
        }

        stream.getVideoTracks().forEach((track) => {
          setCamera(track.enabled);
        });

        if (userVideoRef.current) userVideoRef.current.srcObject = stream;
        setSharing(true);
      })
      .catch((error) => {
        console.log(`getUserMedia error: ${error}`);
      });
  };

  const stopSharingScreen = () => {
    if (userVideoRef.current.srcObject)
      userVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    else return;

    if (userVideoRef.current) userVideoRef.current.srcObject = userMedia;
    userMedia.getTracks().forEach((track) => {
      connectedUsers.map((user) => RTCSenders.get(user.socketId).replaceTrack(track));
    });

    userMedia.getVideoTracks().forEach((track) => {
      setCamera(track.enabled);
    });
    setSharing(false);
  };

  const SplitScreen = (PeopleNum) => {
    let Number = 1;
    if (PeopleNum > 1 && PeopleNum < 5) {
      Number = 2.8;
    } else if (PeopleNum > 4) {
      Number = 3.3;
    }
    return Number;
  };

  const userVideoEnlarge = (userSocketId) => {
    if (enlargeVideo) setEnlargedUserSocketId('');
    else setEnlargedUserSocketId(userSocketId);
    setEnlargeVideo(!enlargeVideo);
  };

  return (
    <div className="Container">
      {enlargeVideo ? (
        <EnlargeVideoModal
          enlargedUserSocketId={enlargedUserSocketId}
          userVideoEnlarge={userVideoEnlarge}
          getTime={getTime}
        ></EnlargeVideoModal>
      ) : (
        <></>
      )}
      {kicked ? <UserKickedModal></UserKickedModal> : <></>}
      {openKickOutModal ? <UserKickOutModal></UserKickOutModal> : <></>}
      {openReloadModal ? <StudyRoomReloadModal></StudyRoomReloadModal> : <></>}
      {openExitAllUsersModal ? <ExitAllUsersModal></ExitAllUsersModal> : <></>}
      <LeftBar studyRoomId={studyRoomId} masterId={masterId} userId={userId} />

      <div className="RightWrap">
        <div className="RoomTopBarContainer">
          <div className="ImageContainer">
            <div className="textW">{studyRoomInfo.title}</div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <img
                src={user_icon}
                alt="userIcon"
                style={{ width: '17px', height: 'auto' }}
              />
              <div className="textW">{connectedUsers.length + 1}명</div>
              <div className="textW" style={{ marginLeft: '10px' }}>
                Study Time: {studyTimer}
              </div>
            </div>
          </div>
          <div className="ImageContainer">
            <img src={mic ? mic_true : mic_false} onClick={audioMute} alt="mic" />
            <img
              src={camera ? camera_true : camera_false}
              onClick={videoMute}
              alt="camera"
            />
            <img
              src={sharing ? screen_true : screen_false}
              onClick={sharingScreen}
              alt={screen_false}
            />
          </div>
          <div
            style={{
              padding: '0 20px',
              marginRight: '20px',
            }}
          ></div>
        </div>

        {initSetting ? (
          <StudyRoomSocket
            secTimer={secTimer}
            userVideoRef={userVideoRef}
            userInfo={userInfo}
            userNickName={userNickName}
          ></StudyRoomSocket>
        ) : (
          <StudyRoomModal
            setInitSetting={initSettings}
            videoRef={userVideoRef}
            notice={studyRoomInfo.notice}
          ></StudyRoomModal>
        )}

        <div className="displaysWrap">
          <div style={{ margin: '10px' }}>
            <div className="videosWrap">
              <div
                className="videoGrid"
                style={{
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'white',
                  height: 'calc(100%/' + SplitScreen(connectedUsers.length + 1) + ')',
                  width: 'calc(100%/' + SplitScreen(connectedUsers.length + 1) + ')',
                }}
              >
                <>
                  <video muted autoPlay playsInline ref={userVideoRef}></video>
                  {userNickName} {studyTimer}
                </>
              </div>
              {connectedUsers.map((user, index) => {
                return (
                  <div
                    className="videoGrid"
                    style={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: 'white',
                      height: 'calc(100%/' + SplitScreen(connectedUsers.length + 1) + ')',
                      width: 'calc(100%/' + SplitScreen(connectedUsers.length + 1) + ')',
                    }}
                  >
                    <UserVideo
                      key={index}
                      nickName={user.nickName}
                      videoMuted={userVideoMute.get(user.socketId)}
                      audioMuted={userAudioMute.get(user.socketId)}
                      studyTime={getTime(connectedUserTimer.get(user.socketId))}
                      stream={user.stream}
                      userVideoEnlarge={userVideoEnlarge}
                      userSocketId={user.socketId}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="ListWrap">
          {UserList(
            JSON.parse(userInfo)['userId'],
            studyRoomId,
            userNickName,
            connectedUsers,
            setVideoMute,
            setAudioMute,
            userVideoMute,
            userAudioMute,
            studyRoomInfo.masterId,
            studyRoomInfo.maxUserCount,
          )}
          <Chat userNickName={userNickName} />
        </div>
      </div>
    </div>
  );
};

export default StudyRoom;
