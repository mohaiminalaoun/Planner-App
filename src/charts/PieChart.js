import * as d3 from "d3";

const COLOR_PROGRESS = "#3CB371",
  COLOR_DEFINED = "#868f90",
  COLOR_COMPLETED = "#1E90FF",
  STATE_PROPRESS = "progress",
  STATE_DEFINED = "defined",
  STATE_UNDEFINED = "undefined",
  STATE_COMPLETED = "completed";

const createPieChart = props => {
  if (document.getElementById("mypie")) {
    d3.selectAll("svg").remove();
  }
  let data = {};
  props.tasks.forEach(t => {
    if (!data[t.progressState]) {
      data[t.progressState] = 1;
    } else {
      data[t.progressState]++;
    }
  });
  const width = 150,
    height = 100,
    margin = 20;

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  const radius = Math.min(width, height) / 2 - margin;

  // append the svg object to the div called 'my_dataviz'
  let svg = d3
    .select("#mypie")
    .append("svg")
    .attr("width", "50%")
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  let svg2 = d3
    .select("#mypie")
    .append("svg")
    .attr("width", "50%")
    .attr("height", height);

  // set the color scale
  let color = d3
    .scaleOrdinal()
    .domain([STATE_PROPRESS, STATE_DEFINED, STATE_UNDEFINED, STATE_COMPLETED])
    .range([COLOR_PROGRESS, COLOR_DEFINED, COLOR_DEFINED, COLOR_COMPLETED]);

  // Compute the position of each group on the pie:
  let pie = d3.pie().value(function(d) {
    return d.value;
  });
  let data_ready = pie(d3.entries(data));

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

  svg2
    .append("circle")
    .attr("cx", 7)
    .attr("cy", 5)
    .attr("r", 6)
    .style("fill", "#3CB371");

  svg2
    .append("circle")
    .attr("cx", 7)
    .attr("cy", 20)
    .attr("r", 6)
    .style("fill", "#1E90FF");

  svg2
    .append("circle")
    .attr("cx", 7)
    .attr("cy", 35)
    .attr("r", 6)
    .style("fill", "#868f97");

  svg2
    .append("text")
    .attr("x", 15)
    .attr("y", 5)
    .text("In Progress")
    .style("font-size", "8px")
    .attr("alignment-baseline", "middle");

  svg2
    .append("text")
    .attr("x", 15)
    .attr("y", 20)
    .text("Completed")
    .style("font-size", "8px")
    .attr("alignment-baseline", "middle");

  svg2
    .append("text")
    .attr("x", 15)
    .attr("y", 35)
    .text("Defined")
    .style("font-size", "8px")
    .attr("alignment-baseline", "middle");
};

export { createPieChart };
