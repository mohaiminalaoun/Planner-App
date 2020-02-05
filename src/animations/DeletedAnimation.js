import React from "react";
import animationData from "./deleted.json";
import Lottie from "react-lottie";
const DeletedAnimation = props => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid"
    }
  };

  const style = {
    position: "absolute",
    zIndex: "4",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  };

  if (props.show) {
    return (
      <div className="deleted-animation" style={style}>
        <Lottie options={defaultOptions} height={200} width={300} />
      </div>
    );
  } else {
    return <></>;
  }
};

export default DeletedAnimation;
