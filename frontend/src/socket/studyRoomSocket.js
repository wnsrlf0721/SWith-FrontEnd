import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { studyRoomAtoms } from '../components/recoils';
import configs from '../utils/configs.json';
import socket from './socket';

const pc_config = {
  iceServers: [configs['stun-server'], configs['turn-server']],
};

export const StudyRoomSocket = ({ secTimer, userVideoRef, userInfo, userNickName }) => {
  const [PCs, setPCs] = useRecoilState(studyRoomAtoms.PCs);
  const [connectedUsers, setConnectedUsers] = useRecoilState(
    studyRoomAtoms.connectedUsers,
  );
  const [connectedUserTimer, setConnectedUserTimer] = useRecoilState(
    studyRoomAtoms.connectedUserTimer,
  );
  const [userAudioMute, setUserAudioMute] = useRecoilState(studyRoomAtoms.userAudioMute);
  const [userVideoMute, setUserVideoMute] = useRecoilState(studyRoomAtoms.userVideoMute);
  const [RTCSenders, setRTCSenders] = useRecoilState(studyRoomAtoms.RTCSenders);
  const [enlargeVideo, setEnlargeVideo] = useRecoilState(studyRoomAtoms.enlargeVideo);
  const [enlargedUserSocketId, setEnlargedUserSocketId] = useRecoilState(
    studyRoomAtoms.enlargedUserSocketId,
  );
  const [kicked, setKicked] = useRecoilState(studyRoomAtoms.kicked);
  const [openReloadModal, setOpenReloadModal] = useRecoilState(
    studyRoomAtoms.openReloadModal,
  );
  const [openExitAllUsersModal, setOpenExitAllUsersModal] = useRecoilState(
    studyRoomAtoms.openExitAllUsersModal,
  );
  const [exitUserSocketId, setExitUserSocketId] = useState('');

  useEffect(() => {
    initSocket();
  }, []);

  useEffect(() => {
    if (enlargedUserSocketId === exitUserSocketId) {
      setEnlargeVideo(false);
      setEnlargedUserSocketId('');
    }
  }, [exitUserSocketId]);

  const initSocket = () => {
    socket.on('all_users', (allUsers) => {
      let len = allUsers.length;
      for (let i = 0; i < len; i++) {
        createPeerConnection(
          allUsers[i].socketId,
          allUsers[i].userName,
          allUsers[i].userId,
        );
        let pc = PCs.get(allUsers[i].socketId);

        if (pc) {
          pc.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
          })
            .then((sdp) => {
              pc.setLocalDescription(new RTCSessionDescription(sdp));
              socket.emit('offer', {
                sdp: sdp,
                offerSendID: socket.id,
                offerSendUserName: userNickName,
                offerSendUserId: JSON.parse(userInfo)['userId'],
                offerStudyTimer: secTimer.current,
                offerReceiveID: allUsers[i].socketId,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    });

    socket.on('getOffer', (data) => {
      let pc = createPeerConnection(
        data.offerSendID,
        data.offerSendUserName,
        data.offerSendUserId,
      );
      if (pc) {
        pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(() => {
          pc.createAnswer({
            offerToReceiveVideo: true,
            offerToReceiveAudio: true,
          })
            .then((sdp) => {
              pc.setLocalDescription(new RTCSessionDescription(sdp));
              socket.emit('answer', {
                sdp: sdp,
                answerSendID: socket.id,
                answerStudyTimer: secTimer.current,
                answerReceiveID: data.offerSendID,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        });
        setConnectedUserTimer(
          new Map(connectedUserTimer.set(data.offerSendID, data.offerStudyTimer)),
        );
        setUserAudioMute(new Map(userAudioMute.set(data.offerSendID, true)));
        setUserVideoMute(new Map(userVideoMute.set(data.offerSendID, true)));
      }
    });

    socket.on('getAnswer', (data) => {
      let pc = PCs.get(data.answerSendID);
      if (pc) {
        pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
        setConnectedUserTimer(
          new Map(connectedUserTimer.set(data.answerSendID, data.answerStudyTimer)),
        );
        setUserAudioMute(new Map(userAudioMute.set(data.answerSendID, true)));
        setUserVideoMute(new Map(userVideoMute.set(data.answerSendID, true)));
      }
    });

    socket.on('getCandidate', (data) => {
      let pc = PCs.get(data.candidateSendID);
      if (pc) {
        pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    });

    socket.on('user_exit', (data) => {
      PCs.get(data.socketId).close();
      PCs.delete(data.socketId);
      RTCSenders.delete(data.socketId);
      connectedUserTimer.delete(data.socketId);
      setExitUserSocketId(data.socketId);
      setConnectedUsers((oldUsers) =>
        oldUsers.filter((user) => user.socketId !== data.socketId),
      );
    });

    socket.on('kickOut', () => {
      setKicked(true);
      socket.disconnect();
    });

    socket.on('reload', () => {
      setOpenReloadModal(true);
    });

    socket.on('all_user_exit', () => {
      setOpenExitAllUsersModal(true);
    });
  };

  const createPeerConnection = (socketID, nickName, userId) => {
    let newPC = new RTCPeerConnection(pc_config);
    setPCs(new Map(PCs.set(socketID, newPC)));

    if (userVideoRef.current.srcObject) {
      userVideoRef.current.srcObject.getTracks().forEach((track) => {
        let rtcSender = newPC.addTrack(track, userVideoRef.current.srcObject);
        setRTCSenders(new Map(RTCSenders.set(socketID, rtcSender)));
      });
    } else {
    }

    newPC.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit('candidate', {
          candidate: e.candidate,
          candidateSendID: socket.id,
          candidateReceiveID: socketID,
        });
      }
    };

    newPC.oniceconnectionstatechange = (error) => {
      console.log(error);
    };

    newPC.ontrack = (e) => {
      setConnectedUsers((oldUsers) =>
        oldUsers.filter((user) => user.socketId !== socketID),
      );
      setConnectedUsers((oldUsers) => [
        ...oldUsers,
        {
          socketId: socketID,
          nickName: nickName,
          userId: userId,
          stream: e.streams[0],
        },
      ]);
    };
    return newPC;
  };

  return <></>;
};
