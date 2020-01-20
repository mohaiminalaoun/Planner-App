import React from "react";
import * as d3 from "d3";

class Dashboard extends React.Component {
  // Define SVG attributes
  // set the dimensions and margins of the graph
  constructor(props) {
    super(props);
  }

  createPieChart() {
    if (document.getElementById("mypie")) {
      d3.select("svg").remove();
    }
    let data = {};
    this.props.tasks.forEach(t => {
      if (!data[t.progressState]) {
        data[t.progressState] = 1;
      } else {
        data[t.progressState]++;
      }
    });
    var width = 100,
      height = 100,
      margin = 20;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin;

    // append the svg object to the div called 'my_dataviz'
    var svg = d3
      .select("#mypie")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // set the color scale
    var color = d3
      .scaleOrdinal()
      .domain(["progress", "defined", "undefined", "completed"])
      .range(["#3CB371", "#868f90", "#868f97", "#1E90FF"]);

    // Compute the position of each group on the pie:
    var pie = d3.pie().value(function(d) {
      return d.value;
    });
    var data_ready = pie(d3.entries(data));

    // shape helper to build arcs:
    var arcGenerator = d3
      .arc()
      .innerRadius(0)
      .outerRadius(radius);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll("whatever")
      .data(data_ready)
      .enter()
      .append("path")
      .attr(
        "d",
        d3
          .arc()
          .innerRadius(50)
          .outerRadius(radius)
      )
      .attr("fill", function(d) {
        return color(d.data.key);
      })
      .attr("stroke", "lightgrey")
      .style("stroke-width", "1px")
      .style("opacity", 0.8);

    console.log(data_ready);
  }

  componentDidMount() {
    this.createPieChart();
  }

  componentDidUpdate() {
    this.createPieChart();
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
