import {useRef, useState, useEffect} from "react";

export const Video = ({ nickName, stream, muted }) => {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
      if (videoRef.current)
      videoRef.current.srcObject = stream;
      if (muted)
        setIsMuted(muted);
    },[stream, muted]);

    return (
      <>
        {/* <div style={{backgroundColor:"white",width:"100%",height:"20px"}}></div> */}
        <video ref={videoRef} muted={isMuted} autoPlay></video>
        {nickName}
      </>
    );
  };