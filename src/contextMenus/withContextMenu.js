import React from "react";
import "./ContextMenu.scss";
const withHOC = OriginalComponent => {
  class NewComponent extends React.Component {
    render() {
      let isMobile = window.matchMedia("only screen and (max-width: 760px)")
        .matches;

      if (isMobile) {
        //Conditional script here
        console.log("isMobile true");
      } else {
        console.log("is mobile false");
      }

      let { props } = this,
        divStyle =
          props.tempPosition[0] + 300 < window.screen.width
            ? {
                left: props.tempPosition[0] + "px",
                top: props.tempPosition[1] + "px"
              }
            : {
                left: "0",
                right: "0",
                top: "40%",
                marginLeft: "auto",
                marginRight: "auto"
              };
      return (
        <OriginalComponent
          {...this.props}
          divStyle={divStyle}
          name="Mohaimin"
        />
      );
    }
  }
  return NewComponent;
};

export default withHOC;
