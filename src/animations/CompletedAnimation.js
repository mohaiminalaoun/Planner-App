import React from "react";
import animationData from "./completed.json";
import Lottie from "react-lottie";
import "./CompletedAnimation.scss";
const CompletedAnimation = props => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid"
    }
  };

  if (props.show) {
    return (
      <div className="completed-animation">
        <Lottie options={defaultOptions} height={200} width={300} />
      </div>
    );
  } else {
    return <></>;
  }
};

export default CompletedAnimation;
