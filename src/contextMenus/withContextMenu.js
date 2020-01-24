import React from "react";
import "./ContextMenu.scss";
const withHOC = OriginalComponent => {
  class NewComponent extends React.Component {
    render() {
      let divStyle = {
        left: this.props.tempPosition[0] + "px",
        top: this.props.tempPosition[1] + "px"
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
