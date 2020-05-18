import React from "react";
import { Badge } from "react-bootstrap";
import "./TabSelector.scss";
const TabSelector = ({ shouldShowDashboard, hideDashboard, showDashboard }) => {
  return (
    <>
      <Badge
        className={"tabselector " + (!shouldShowDashboard ? "selected" : "")}
        onClick={hideDashboard}
      >
        Tasks
        <div class="selectorDiv"></div>
      </Badge>
      <Badge
        className={"tabselector " + (shouldShowDashboard ? "selected" : "")}
        onClick={showDashboard}
      >
        Statistics
        <div class="selectorDiv"></div>
      </Badge>
    </>
  );
};

export default TabSelector;
