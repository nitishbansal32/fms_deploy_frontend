import video from "../../src/Images/loading.mp4";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Loading = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/dashboard", { replace: true });
  }, 6000);
  console.log("hello");

  const videoRef = useRef();
  const setPlayBack = () => {
    videoRef.current.playbackRate = 2;
  };

  return (
    <div
      className="container"
      styles={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <video
        autoPlay
        playsInline
        ref={videoRef}
        onCanPlay={() => setPlayBack()}
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};

export default Loading;
