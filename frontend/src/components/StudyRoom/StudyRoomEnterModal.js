import './css/StudyRoomEnterModal.css';
import styled from 'styled-components';

import { React, useRef, useState, useEffect } from 'react';

const constraints = {
  audio: true,
  video: true,
};

const StudyRoomEnterModal = ({ setInitSetting, videoRef, notice }) => {
  const modalVideoRef = useRef(null);
  const userVideo = (
    <video id="modalVideo" muted autoPlay playsInline ref={modalVideoRef}></video>
  );
  const [userMedia, setUserMedia] = useState(null);
  const [availableUserVideo, setAvailableUserVideo] = useState(false);
  const [videoMuted, setVideoMuted] = useState(true);
  const [modalMedia, setModalMedia] = useState(
    <div id="notAvailableVideo">Loading...</div>,
  );
  const [loading, setLoading] = useState(false);
  const [noticeChecked, setNoticeChecked] = useState(false);

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
    } else {
      if (loading)
        setModalMedia(
          <div id="notAvailableVideo">사용가능한 CAM을 찾을 수 없습니다.</div>,
        );
    }
  }, [availableUserVideo, loading]);

  const enterStudyRoomWithVideo = () => {
    if (videoRef.current && availableUserVideo) {
      videoRef.current.srcObject = modalVideoRef.current.srcObject;
      modalVideoRef.current.srcObject
        .getAudioTracks()
        .forEach((track) => (track.enabled = false));
    }
    setInitSetting(videoMuted, availableUserVideo);
  };

  const videoMute = () => {
    if (availableUserVideo)
      modalVideoRef.current.srcObject.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
        setVideoMuted(track.enabled);
      });
  };

  const checkNotice = () => {
    setNoticeChecked(true);
  };

  return (
    <>
      <ModalOverlay />
      <ModalWrapper tabIndex="-1">
        <ModalInner tabIndex="0" className="modal-inner">
          <span style={noticeChecked ? { display: 'none' } : {}}>
            <p style={{ fontSize: '20px', color: '#ef8585', fontWeight: 'bold' }}>
              스터디룸 공지사항
            </p>
            <p style={{ fontStyle: 'italic', marginBottom: '20px', fontWeight: 'bold' }}>
              {notice ? notice : '공지사항이 없습니다.'}
            </p>
            <Button onClick={checkNotice}>확인</Button>
          </span>
          <span style={noticeChecked ? {} : { display: 'none' }}>
            <Button
              disabled={availableUserVideo && loading ? false : true}
              onClick={videoMute}
              style={availableUserVideo && loading ? {} : { background: 'gray' }}
            >
              {videoMuted ? '비디오 끄기' : '비디오 켜기'}
            </Button>
            {modalMedia}
            <Button
              disabled={availableUserVideo && loading ? false : true}
              onClick={enterStudyRoomWithVideo}
              style={availableUserVideo && loading ? {} : { background: 'gray' }}
            >
              입장하기
            </Button>
          </span>
        </ModalInner>
      </ModalWrapper>
    </>
  );
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  text-align: center;
  display: 'block';
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
  display: 'block';
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
  padding: 20px 20px;
`;

const Button = styled.button`
  align-items: center;
  width: 25%;
  height: 35px;
  background-color: #ef8585;
  font-size: 0.95rem;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  border: 0;
  outline: 0;
  text-decoration: none;
`;

export default StudyRoomEnterModal;
