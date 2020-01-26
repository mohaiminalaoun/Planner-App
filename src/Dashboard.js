import React from "react";
import * as d3 from "d3";
import * as PieChart from "./charts/PieChart";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import Moment from "moment";
import { Badge } from "react-bootstrap";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    let start = Moment(new Date())
        .subtract(30, "days")
        .format("YYYY-MM-DD"),
      end = Moment(new Date())
        .add(100, "days")
        .format("YYYY-MM-DD");
    this.state = {
      dates: [],
      firstDate: start,
      lastDate: end
    };
  }

  componentDidMount() {
    //PieChart.createPieChart(this.props, "label");
    //PieChart.createPieChart(this.props, "label");
    let dateSet = {},
      dates = [];
    this.props.tasks.forEach(t => {
      if (t.end) {
        let date = Moment(t.end).format("YYYY-MM-DD");
        dateSet[date] = dateSet[date] ? dateSet[date] + 1 : 1;
      }
    });

    for (let d in dateSet) {
      dates.push({
        date: d,
        count: dateSet[d]
      });
    }
    this.setState({
      dates: dates
    });
  }

  render() {
    return (
      <div className="dashboard">
        {/*<div id="mypie"></div>
      </div>*/}
        <CalendarHeatmap
          startDate={new Date(this.state.firstDate || "2020-01-01")}
          endDate={new Date(this.state.lastDate || "2020-06-12")}
          values={this.state.dates}
          titleForValue={v => {
            return v && `${v.date} : ${v.count} tasks`;
          }}
        />
      </div>
    );
  }
}

export default Dashboard;
