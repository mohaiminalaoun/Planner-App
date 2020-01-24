import React from "react";
import * as d3 from "d3";
import * as PieChart from "./charts/PieChart";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    PieChart.createPieChart(this.props, "label");
  }

  componentDidUpdate() {
    PieChart.createPieChart(this.props, "label");
  }

  render() {
    return (
      <div className="dashboard">
        <div id="mypie"></div>
      </div>
    );
  }
}

export default Dashboard;
