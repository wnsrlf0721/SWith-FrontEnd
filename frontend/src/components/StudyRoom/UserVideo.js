import { useRef, useState, useEffect } from 'react';

const UserVideo = ({
  nickName,
  stream,
  videoMuted,
  audioMuted,
  studyTime,
  userVideoEnlarge,
  userSocketId,
}) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (videoRef.current.srcObject)
      videoRef.current.srcObject
        .getVideoTracks()
        .forEach((track) => (track.enabled = videoMuted));
  }, [videoMuted]);

  useEffect(() => {
    if (videoRef.current.srcObject)
      videoRef.current.srcObject
        .getAudioTracks()
        .forEach((track) => (track.enabled = audioMuted));
  }, [audioMuted]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);

  return (
    <>
      <video
        ref={videoRef}
        muted={isMuted}
        onClick={() => userVideoEnlarge(userSocketId)}
        autoPlay
      ></video>
      {nickName} {studyTime}
    </>
  );
};

export default UserVideo;
