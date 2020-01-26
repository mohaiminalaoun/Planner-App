import React from "react";
import "./ContextMenu.scss";
const withHOC = OriginalComponent => {
  class NewComponent extends React.Component {
    render() {
      let { props } = this,
        divStyle = {
          left:
            props.tempPosition[0] + 150 < window.screen.width
              ? props.tempPosition[0] + "px"
              : props.tempPosition[0] - 150 + "px",
          top: props.tempPosition[1] + "px"
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
