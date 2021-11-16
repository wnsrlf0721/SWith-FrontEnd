import './StudyRoom.css';
import { useRef, useState, useEffect } from 'react';
import { useBeforeunload } from 'react-beforeunload';
import socket from './utils/Socket';
import configs from './utils/configs.json';
import { Video } from './Video';
import { Chat } from './Chat';
import LeftBar from './LeftBar';

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
    const userVideoRef = useRef(null);
    const [connnectedUsers, setConnnectedUsers] = useState([]);
    const [PCs, setPCs] = useState(new Map());
    const studyRoomId = match.params.studyRoomId;
    const userNickName = match.params.nickName;
    

    useBeforeunload(() => {
      window.localStorage.setItem("enteredStudyRoom", "false");
      return ("Are you sure to close this tab?")
    });

    useEffect(() => {        
        initSocket();

        console.log(window.sessionStorage);
        navigator.mediaDevices
            .getUserMedia({
                audio: true,
                video: true,
            })
            .then((stream) => {
                if (userVideoRef.current) userVideoRef.current.srcObject = stream;

                senderMediaStream = stream;
                currentStream = stream;

                socket.emit('join_room', { room: studyRoomId, userName: userNickName });
            })
            .catch((error) => {
                console.log(`getUserMedia error: ${error}`);

                let stream = new MediaStream();
                if (userVideoRef.current) userVideoRef.current.srcObject = stream;

                senderMediaStream = stream;
                currentStream = stream;

                socket.emit('join_room', { room: studyRoomId, userName: userNickName });
            });
    }, []);

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
            setConnnectedUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
        });
    };

    const createPeerConnection = (socketID, nickName) => {
        let newPC = new RTCPeerConnection(pc_config);
        setPCs(new Map(PCs.set(socketID, newPC)));

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

        if (currentStream) {
            console.log('localstream add');
            currentStream.getTracks().forEach((track) => {
                senderTrcak = newPC.addTrack(track, currentStream);
            });
        } else {
            console.log('no local stream');
        }

        return newPC;
    };

    const videoMute = () => {
        currentStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
        setCamera(!camera);
    };

    const audioMute = () => {
        currentStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
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
                    currentStream = senderMediaStream;
                    if (senderMediaStream && userVideoRef.current) userVideoRef.current.srcObject = senderMediaStream;
                    senderMediaStream.getTracks().forEach((track) => {
                        senderTrcak.replaceTrack(track);
                    });
                });

                stream.getTracks().forEach((track) => {
                    senderTrcak.replaceTrack(track);
                });

                if (userVideoRef.current) userVideoRef.current.srcObject = stream;
                senderScreenStream = stream;
                currentStream = stream;
            })
            .catch((error) => {
                console.log(`getUserMedia error: ${error}`);
            });
    
    };

    const stopSharingScreen = () => {
        if (senderScreenStream) senderScreenStream.getTracks().forEach((track) => track.stop());
        else return;
        if (userVideoRef.current) userVideoRef.current.srcObject = senderMediaStream;
        senderMediaStream.getTracks().forEach((track) => {
            senderTrcak.replaceTrack(track);
        });
    };

    const disconnectSocket = () => {
        socket.disconnect();
    };
    
    const [camera, setCamera] = useState(true)
    const [mic, setMic] = useState(true)
    const [speaker, setSpeaker] = useState(true)
    const [sharing, setSharing] = useState(true)


    



    return (
        <div className="Container" >
            <LeftBar/>
            <div className= "RightWrap">
                <div className="App" >
                    <div className="RoomTopBarContainer">
                        <div className="ImageContainer">
                            <img src = {user_icon} alt = "userIcon"/>
                            <p>3명 나중에 수정</p>
                            <p>스터디룸 이름 나중에 수정</p>
                        </div>
                        <div className="ImageContainer">
                            <img src = {mic? mic_true:mic_false} alt = "mic"/>
                            <img src = {camera? camera_true:camera_false} onClick={videoMute} alt = "camera"/>
                            <img src = {speaker? speaker_true:speaker_false} onClick={audioMute} alt ="speaker"/>  
                        </div>
                        <div style={{
                            padding : "0 20px", 
                            marginRight : "20px"}}>
                            <img src = {user_invite} alt = "userInvite"/>
                        </div>
                    </div>
                    <div style={{
                        padding : "0 20px", 
                        marginRight : "20px"}}>
                        <img src = {user_invite} alt = "userInvite"/>
                    </div>
                </div>
                <div className = "disdplayAndListWrap">
                    <div className= "disdplaytWrap">
                        <div className="App" >
                            <div style={{margin : "10px"}}>
                                <Chat userNickName={userNickName} />
                                <div>
                                    <h1>Realtime communication with WebRTC</h1>
                                    <video muted autoPlay playsInline ref={userVideoRef}></video>
                                    <button onClick={videoMute}>video mute</button>
                                    <button onClick={audioMute}>audio mute</button>
                                    <button onClick={startSharingScreen}>display sharing start</button>
                                    <button onClick={stopSharingScreen}>display sharing stop</button>
                                    <button onClick={disconnectSocket}>disconnect socket</button>
                                    {connnectedUsers.map((user, index) => {
                                        return <Video key={index} nickName={user.nickName} stream={user.stream} />;
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ListtWrap">
                        <UserList/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudyRoom;
