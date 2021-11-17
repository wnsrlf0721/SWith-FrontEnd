import { React, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './StudyRoomModal.css'

const constraints = {
    audio: true,
    video: true
};

export const StudyRoomModal = ({ setInitSetting, videoRef }) => {
    const modalVideoRef = useRef(null);
    const userVideo = <video id="modalVideo" muted autoPlay playsInline ref={modalVideoRef}></video>;
    const [visible, setVisible] = useState(true);
    const [userMedia, setUserMedia] = useState(null);
    const [availableUserVideo, setAvailableUserVideo] = useState(false);
    const [videoMuted, setVideoMuted] = useState(true);
    const [modalMedia, setModalMedia] = useState(<div id="notAvailableVideo">Loading...</div>);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
                setLoading(true);
                setAvailableUserVideo(true);
                setUserMedia(stream);
                
            })
            .catch((error) => {
                console.log(`getUserMedia error: ${error}`);
                setLoading(true);
                setAvailableUserVideo(false);
            });
            
    }, []);

    useEffect(() => {
        if (!userMedia) return;
        if (modalVideoRef.current) modalVideoRef.current.srcObject = userMedia;
    }, [userMedia]);

    useEffect(() => {
        if (availableUserVideo) {
            setModalMedia(userVideo);
        }
        else {
            if(loading)
                setModalMedia(<div id="notAvailableVideo">사용가능한 CAM을 찾을 수 없습니다.</div>);
        }

    }, [availableUserVideo, loading]);

    const enterStudyRoomWithVideo = () => {
        if (videoRef.current && availableUserVideo){
            videoRef.current.srcObject = modalVideoRef.current.srcObject;
            modalVideoRef.current.srcObject.getAudioTracks().forEach((track) => (track.enabled = false));
        } 
        setInitSetting(videoMuted, availableUserVideo);
        setVisible(false);
    };

    const videoMute = () => {
        if(availableUserVideo)
            modalVideoRef.current.srcObject.getVideoTracks().forEach((track) => {
                track.enabled = !track.enabled
                setVideoMuted(track.enabled)
            });
    };

    return (
        <>
            <ModalOverlay visible={visible} />
            <ModalWrapper tabIndex="-1" visible={visible}>
                <ModalInner tabIndex="0" className="modal-inner">
                    <button disabled={loading? false : true} onClick={videoMute}>video mute</button>
                    {modalMedia}
                    <button disabled={loading? false : true} onClick={enterStudyRoomWithVideo}>enter studyroom</button>
                </ModalInner>
            </ModalWrapper>
        </>
    );
};

StudyRoomModal.propTypes = {
    visible: PropTypes.bool,
};

const ModalWrapper = styled.div`
    box-sizing: border-box;
    text-align: center;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    overflow: auto;
    outline: 0;
`;

const ModalOverlay = styled.div`
    box-sizing: border-box;
    display: ${(props) => (props.visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
`;

const ModalInner = styled.div`
    box-sizing: border-box;
    position: relative;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
    background-color: #fff;
    border-radius: 10px;
    width: 480px;
    max-width: 560px;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    padding: 40px 20px;
`;
