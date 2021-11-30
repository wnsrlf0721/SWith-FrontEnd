import { useRef, useState, useEffect } from 'react';

const UserVideo = ({ nickName, stream, videoMuted, audioMuted, muted, studyTime }) => {
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
    if (muted) setIsMuted(muted);
  }, [stream, muted]);

  return (
    <>
      <video ref={videoRef} muted={isMuted} autoPlay></video>
      {nickName} {studyTime}
    </>
  );
};

export default UserVideo;
