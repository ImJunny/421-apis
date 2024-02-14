import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

//Function to get data to pass on d3 formatter
async function getData() {
  //Fetch data from json file
  let res = await fetch(
    "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
  );
  let data = await res.json();

  //get min/max year and population
  let dataArr = data.data;
  let years = [];
  let populations = [];
  dataArr.forEach((item) => {
    years.push(item["ID Year"]);
    populations.push(item.Population);
  });
  years.sort();
  populations.sort();
  let minYear = years[0];
  let maxYear = years[years.length - 1];
  let minPopulation = populations[0];
  let maxPopulation = populations[populations.length - 1];
  //call buildGraph, passing necessary info to format graph
  buildGraph(minYear, maxYear, minPopulation, maxPopulation, dataArr);
}

//Function to format d3 graph
function buildGraph(minYear, maxYear, minPopulation, maxPopulation, dataArr) {
  // Declare the chart dimensions and margins.
  const width = 640;
  const height = 400;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 80;

  // Declare the x (horizontal position) scale.
  const x = d3
    .scaleUtc()
    .domain([new Date(minYear), new Date(maxYear)])
    .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const y = d3
    .scaleLinear()
    .domain([minPopulation, maxPopulation])
    .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  const svg = d3.create("svg").attr("width", width).attr("height", height);

  // Add the x-axis.
  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x).tickFormat(d3.format(".0f")));

  // Add the y-axis.
  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));

  // Make lines
  svg
    .append("path")
    .datum(dataArr)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d["ID Year"]);
        })
        .y(function (d) {
          return y(d.Population);
        })
    );

  // Append the SVG element.
  container.append(svg.node());
}

getData();
