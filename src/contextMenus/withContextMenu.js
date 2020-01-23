import React from "react";

const withHOC = OriginalComponent => {
  class NewComponent extends React.Component {
    render() {
      return <OriginalComponent {...this.props} name="Mohaimin" />;
    }
  }
  return NewComponent;
};

export default withHOC;
