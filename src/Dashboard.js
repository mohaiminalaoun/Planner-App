import React from "react";
import * as d3 from "d3";
import * as PieChart from "./charts/PieChart";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import Moment from "moment";
import { Badge } from "react-bootstrap";
import ContextMenuContainer from "./components/contextMenus/ContextMenuContainer";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    let start = Moment(new Date())
        .subtract(30, "days")
        .format("YYYY-MM-DD"),
      end = Moment(new Date())
        .add(100, "days")
        .format("YYYY-MM-DD"),
      numDays = Moment(end).diff(start, "days"),
      num = 0,
      day = start,
      dates = [],
      dateSet = {};
    while (num < numDays) {
      let date = Moment(day).format("YYYY-MM-DD");
      dates.push({ date: date, count: 0 });
      dateSet[date] = num;
      num++;
      day = Moment(day).add(1, "days");
    }
    this.state = {
      dates: dates,
      dateSet: dateSet,
      firstDate: start,
      lastDate: end
    };
  }

  setUpDates = () => {
    this.setState({
      dates: this.getDatesFromProps()
    });
  };

  getDatesFromProps = () => {
    let dateSet = {},
      dates = [];
    this.props.tasks.forEach(t => {
      if (t.end) {
        let date = Moment(t.end).format("YYYY-MM-DD");
        dateSet[date] = dateSet[date] ? dateSet[date] + 1 : 1;
      }
    });
    dates = this.state.dates;
    dates.forEach(date => {
      date.count = 0;
    });

    for (let d in dateSet) {
      let idx = this.state.dateSet[d];
      dates && dates[idx] && dates[idx].count++;
    }
    return dates;
  };

  componentDidMount() {
    //PieChart.createPieChart(this.props, "label");
    //PieChart.createPieChart(this.props, "label");
    this.setUpDates();
  }

  render() {
    return (
      <div className="dashboard">
        {/*<div id="mypie"></div>
      </div>*/}
        <ContextMenuContainer
          displayCalendarCtxMenu={this.props.displayCalendarCtxMenu}
          currentCalendarDate={this.props.currentCalendarDate}
          addTaskToDate={this.props.addTaskToDate}
          hideCalendarContextMenu={this.props.hideCalendarContextMenu}
        />
        <CalendarHeatmap
          startDate={new Date(this.state.firstDate || "2020-01-01")}
          endDate={new Date(this.state.lastDate || "2020-06-12")}
          values={(() => {
            return this.getDatesFromProps();
          })()}
          titleForValue={v => {
            return v && `${v.date} : ${v.count} tasks`;
          }}
          classForValue={value => {
            if (value && value !== null && value.count === 0) {
              return "color-empty";
            } else {
              if (value === null) return "color-empty";
              return "color-filled";
            }
          }}
          onClick={value => {
            if (value && value.date) {
              this.props.showCalendarContextMenu(value.date);
            }
          }}
        />
      </div>
    );
  }
}

export default Dashboard;
