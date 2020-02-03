import React from "react";
import { Badge } from "react-bootstrap";
import "./TabSelector.scss";
const TabSelector = props => {
  return (
    <>
      <Badge
        className={
          "tabselector " + (!props.shouldShowDashboard ? "selected" : "")
        }
        onClick={props.hideDashboard}
      >
        Tasks
      </Badge>
      <Badge
        className={
          "tabselector " + (props.shouldShowDashboard ? "selected" : "")
        }
        onClick={props.showDashboard}
      >
        Statistics
      </Badge>
    </>
  );
};

export default TabSelector;
