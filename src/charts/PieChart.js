import * as d3 from "d3";

const COLOR_PROGRESS = "#3CB371",
  COLOR_DEFINED = "#868f90",
  COLOR_COMPLETED = "#1E90FF",
  STATE_PROPRESS = "progress",
  STATE_DEFINED = "defined",
  STATE_UNDEFINED = "undefined",
  STATE_COMPLETED = "completed";

const createPieChart = (props, filterBy) => {
  if (document.getElementById("mypie")) {
    d3.selectAll("svg").remove();
  }
  let data = {};

  props.tasks.forEach(t => {
    if (filterBy === "progressState") {
      if (!data[t.progressState]) {
        data[t.progressState] = 1;
      } else {
        data[t.progressState]++;
      }
    } else if (filterBy === "label") {
      if (!data[t.label]) {
        data[t.label] = 1;
      } else {
        data[t.label]++;
      }
    }
  });

  console.log(data);
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
  let data_ready = pie(d3.entries(data)),
    arcs = pie(d3.entries(data)),
    arcLabel = () => {
      const radius = (Math.min(width, height) / 2) * 0.8;
      return d3
        .arc()
        .innerRadius(radius)
        .outerRadius(radius);
    };
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
    .append("title")
    .text(d => `Hello`);

  svg
    .append("g")
    .attr("font-family", "sans-serif")
    .attr("font-size", 12)
    .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text")
    //  .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
    .attr("transform", function(d) {
      console.log("in transform");
      console.log(d);
      // TODO: figure out how to calculate translate with startAngle and endAngle and radius
      return `translate(${-d.startAngle * 5},${-d.endAngle * 5})`;
    })
    .call(text =>
      text
        .append("tspan")
        .attr("y", "-0.4em")
        .attr("font-weight", "bold")
        .text(d => {
          console.log("d is " + d);
          return d.data.key;
        })
    );
};

export { createPieChart };
