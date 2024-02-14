// apiKey
let apiKey = "vw9qljpukPLh2ikcg1dpkw==rFI4ObG0fqYCxSSb";

// onclick function that takes input and uses fetch function
function generate() {
  let word = document.getElementById("input").value;
  if (word == "") return;
  let container = (document.getElementById("container").innerHTML = "");
  getData(word);
}

// fetch data to get synonyms array
async function getData(word) {
  let res = await fetch(
    "https://api.api-ninjas.com/v1/thesaurus?word=" + word,
    {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
      },
    }
  );
  let data = await res.json();
  let synonymsArr = data.synonyms;
  console.log(synonymsArr);
  buildCloud(synonymsArr);
}

// d3 cloud
function buildCloud(synonymsArr) {
  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 10, bottom: 10, left: 10 },
    width = 600 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3
    .select("#container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
  var layout = d3.layout
    .cloud()
    .size([width, height])
    .words(
      synonymsArr.map(function (d) {
        return { text: d };
      })
    )
    .padding(0)
    .fontSize(30)
    .on("end", draw);
  layout.start();

  // This function takes the output of 'layout' above and draw the words
  // Better not to touch it. To change parameters, play with the 'layout' variable above
  function draw(words) {
    svg
      .append("g")
      .attr(
        "transform",
        "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")"
      )
      .selectAll("text")
      .data(words)
      .enter()
      .append("text")
      .style("font-size", function (d) {
        return d.size + "px";
      })
      .attr("text-anchor", "middle")
      .attr("transform", function (d) {
        return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
      })
      .text(function (d) {
        return d.text;
      });
  }
}
