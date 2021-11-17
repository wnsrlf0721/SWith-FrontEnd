import './StudyRoom.css';
import { useRef, useState, useEffect } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import socket from './utils/Socket';
import configs from './utils/configs.json';
import { Video } from './Video';
import { Chat } from './Chat';
import { StudyRoomModal } from './StudyRoomModal';

import user_icon from "../../images/user_icon.png";
import camera_true from "../../images/camera_true.png";
import camera_false from "../../images/camera_false.png";
import mic_true from "../../images/mic_true.png";
import mic_false from "../../images/mic_false.png";
import speaker_true from "../../images/speaker_true.png";
import speaker_false from "../../images/speaker_false.png";
import user_invite from "../../images/user_invite.png"

import LeftBar from "./LeftBar"
import UserList from './UserList';

let senderMediaStream;
let senderScreenStream;
let currentStream;
let senderTrcak;
const pc_config = {
    iceServers: [configs['stun-server'], configs['turn-server']],
};

const StudyRoom = ({ match }) => {
    const studyRoomId = match.params.studyRoomId;
    const userNickName = match.params.nickName;

    const userVideoRef = useRef(null);
    const [connnectedUsers, setConnnectedUsers] = useState([]);
    const [PCs, setPCs] = useState(new Map());
    const [userMedia, setUserMedia] = useState(null);
    const [displayMedia, setDisplayMedia] = useState(null);
    const [availableUserMedia, setAvailableUserMedia] = useState(false);
    const [RTCSenders, setRTCSenders] = useState(new Map());


    const [PeopleNum, setPeopleNum] = useState()



    useBeforeunload(() => {
        window.localStorage.setItem("enteredStudyRoom", "false");
        return ("Are you sure to close this tab?")
    });

    useEffect(() => {
        initSocket();
    }, [])

    const initSettings = (useUserVideo, availableUserVideo) => {
        console.log(userVideoRef.current.srcObject);
        if (availableUserVideo)
            setUserMedia(userVideoRef.current.srcObject);

        setAvailableUserMedia(availableUserVideo);
        socket.emit('join_room', { room: studyRoomId, userName: userNickName });
    }

    const initSocket = () => {
        socket.on('all_users', (allUsers) => {
            let len = allUsers.length;
            for (let i = 0; i < len; i++) {
                createPeerConnection(allUsers[i].id, allUsers[i].userName);
                let pc = PCs.get(allUsers[i].id);

                if (pc) {
                    pc.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true })
                        .then((sdp) => {
                            console.log('create offer success');
                            pc.setLocalDescription(new RTCSessionDescription(sdp));
                            socket.emit('offer', {
                                sdp: sdp,
                                offerSendID: socket.id,
                                offerSendUserName: userNickName,
                                offerReceiveID: allUsers[i].id,
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            }
        });

        socket.on('getOffer', (data) => {
            console.log('get offer');
            let pc = createPeerConnection(data.offerSendID, data.offerSendUserName);
            if (pc) {
                pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(() => {
                    console.log('answer set remote description success');
                    pc.createAnswer({ offerToReceiveVideo: true, offerToReceiveAudio: true })
                        .then((sdp) => {
                            console.log('create answer success');
                            pc.setLocalDescription(new RTCSessionDescription(sdp));
                            socket.emit('answer', {
                                sdp: sdp,
                                answerSendID: socket.id,
                                answerReceiveID: data.offerSendID,
                            });
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                });
            }
        });

        socket.on('getAnswer', (data) => {
            console.log('get answer');
            let pc = PCs.get(data.answerSendID);
            if (pc) {
                pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
            }
        });

        socket.on('getCandidate', (data) => {
            console.log('get candidate');
            let pc = PCs.get(data.candidateSendID);
            if (pc) {
                pc.addIceCandidate(new RTCIceCandidate(data.candidate)).then(() => {
                    console.log('candidate add success');
                });
            }
        });

        socket.on('user_exit', (data) => {
            PCs.get(data.id).close();
            PCs.delete(data.id);
            RTCSenders.delete(data.id);
            setConnnectedUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
        });
    };

    const createPeerConnection = (socketID, nickName) => {
        let newPC = new RTCPeerConnection(pc_config);
        setPCs(new Map(PCs.set(socketID, newPC)));

        if (userVideoRef.current.srcObject) {
            console.log('localstream add');

            userVideoRef.current.srcObject.getTracks().forEach((track) => {
                let rtcSender = newPC.addTrack(track, userVideoRef.current.srcObject);
                setRTCSenders(new Map(RTCSenders.set(socketID, rtcSender)));
            });
        } else {
            console.log('no local stream');
        }

        newPC.onicecandidate = (e) => {
            if (e.candidate) {
                console.log('onicecandidate');
                socket.emit('candidate', {
                    candidate: e.candidate,
                    candidateSendID: socket.id,
                    candidateReceiveID: socketID,
                });
            }
        };

        newPC.oniceconnectionstatechange = (e) => {
            console.log(e);
        };

        newPC.ontrack = (e) => {
            console.log('ontrack success');
            setConnnectedUsers((oldUsers) => oldUsers.filter((user) => user.id !== socketID));
            setConnnectedUsers((oldUsers) => [
                ...oldUsers,
                {
                    id: socketID,
                    nickName: nickName,
                    stream: e.streams[0],
                },
            ]);
        };

        return newPC;
    };
    const videoMute = () => {
        userVideoRef.current.srcObject.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
        setCamera(!camera);
    };

    const audioMute = () => {
        userVideoRef.current.srcObject.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
        setSpeaker(!speaker);
    };

    const startSharingScreen = () => {
        navigator.mediaDevices
            .getDisplayMedia({
                audio: true,
                video: true,
            })
            .then((stream) => {
                stream.getVideoTracks()[0].addEventListener('ended', () => {
                    if (userMedia && userVideoRef.current) userVideoRef.current.srcObject = userMedia;
                    if (connnectedUsers.length > 0) {
                        userMedia.getTracks().forEach((track) => {
                            connnectedUsers.map((user) => {
                                RTCSenders.get(user.id).replaceTrack(track);
                            });
                        });
                    }
                });

                if (connnectedUsers.length > 0) {
                    stream.getTracks().forEach((track) => {
                        connnectedUsers.map((user) => {
                            RTCSenders.get(user.id).replaceTrack(track);
                        });
                    });
                }

                if (userVideoRef.current) userVideoRef.current.srcObject = stream;
            })
            .catch((error) => {
                console.log(`getUserMedia error: ${error}`);
            });

    };

    const stopSharingScreen = () => {
        if (userVideoRef.current.srcObject) userVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        else return;

        if (userVideoRef.current) userVideoRef.current.srcObject = userMedia;
        userMedia.getTracks().forEach((track) => {
            connnectedUsers.map((user) => {
                RTCSenders.get(user.id).replaceTrack(track);
            });
        });
    };

    const disconnectSocket = () => {
        socket.disconnect();
    };
    const SplitScreen = () => {
        let Number = 1;
        const PeopleNum = 1;
        if (PeopleNum == 2) { Number = 2; }
        else if (PeopleNum == 3 || PeopleNum == 4) { Number = 2.8; }
        else if (PeopleNum == 5 || PeopleNum == 6) { Number = 3; }
        else if (PeopleNum >= 7) { Number = 4; }
        return 'calc(100%/' + Number + ')'
    }

    const [camera, setCamera] = useState(true)
    const [mic, setMic] = useState(true)
    const [speaker, setSpeaker] = useState(true)
    const [sharing, setSharing] = useState(true)
    return (
        <div className="Container" >
            <LeftBar />

            <div className="RightWrap">
                <div className="RoomTopBarContainer">
                    <div className="ImageContainer">
                        <img src={user_icon} alt="userIcon" />
                        <p>3명 나중에 수정</p>
                        <p>스터디룸 이름 나중에 수정</p>
                    </div>
                    <div className="ImageContainer">
                        <img src={mic ? mic_true : mic_false} alt="mic" />
                        <img src={camera ? camera_true : camera_false} onClick={videoMute} alt="camera" />
                        <img src={speaker ? speaker_true : speaker_false} onClick={audioMute} alt="speaker" />
                    </div>
                    <div style={{
                        padding: "0 20px",
                        marginRight: "20px"
                    }}>
                        <img src={user_invite} alt="userInvite" />
                    </div>
                </div>

                <StudyRoomModal
                    setInitSetting={initSettings}
                    videoRef={userVideoRef} ></StudyRoomModal>
                    
                <div className="displaysWrap">
                    <div style={{ margin: "10px" }}>
                        <div>
                            <button onClick={videoMute}>video mute</button>
                            <button onClick={audioMute}>audio mute</button>
                            <button onClick={startSharingScreen}>display sharing start</button>
                            <button onClick={stopSharingScreen}>display sharing stop</button>
                            <button onClick={disconnectSocket}>disconnect socket</button>
                        </div>
                        <div className="videosWrap">
                            <div className="videoGrid" style={{ width: SplitScreen() }} >
                                <video muted autoPlay playsInline ref={userVideoRef}></video>
                            </div>
                            {connnectedUsers.map((user, index) => {
                                return (
                                    <div className="videoGrid" style={{ width: SplitScreen() }} >
                                        <Video key={index} nickName={user.nickName} stream={user.stream} />
                                    </div>
                                );
                            })}
                        </div>

                    </div>

                </div>
                <div className="ListWrap">
                    <UserList />
                    <Chat userNickName={userNickName} />
                </div>
            </div>
        </div>
    );
};

export default StudyRoom;
