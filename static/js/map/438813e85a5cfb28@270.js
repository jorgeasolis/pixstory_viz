// https://observablehq.com/@d3/us-state-choropleth@270
import define1 from "./7a9e12f9fb3d8e06@498.js";
import define2 from "./2695158caff5fb0c@595.js";

function _1(md){return(
md`# U.S. State Choropleth

Unemployment rate by state, July 2019. Data: [Bureau of Labor Statistics](http://www.bls.gov/lau/#tables)`
)}

function _key(Legend,chart){return(
Legend(chart.scales.color, {title: "Number of posts"})
)}

function _chart(UsStateChoropleth,unemployment,namemap,d3){return(
UsStateChoropleth(unemployment, {
  id: d => namemap.get(d.name),
  value: d => d.rate,
  scale: d3.scaleQuantize,
  domain: [0, 87],
  range: d3.schemeBlues[6],
  title: (f, d) => `${f.properties.name}\n${d?.rate}`
})
)}

function _unemployment(FileAttachment){return(
FileAttachment("unemployment201907.csv").csv({typed: true})
)}

function _namemap(states){return(
new Map(states.features.map(d => [d.properties.name, d.id]))
)}

function _UsStateChoropleth(states,statemesh,Choropleth){return(
function UsStateChoropleth(data, {
  features = states,
  borders = statemesh,
  width = 975,
  height = 610,
  ...options
} = {}) {
  return Choropleth(data, {features, borders, width, height, ...options});
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["unemployment201907.csv", {url: new URL("./files/us_states.csv", import.meta.url), mimeType: "text/csv", toString}]
    //["unemployment201907.json", {url: new URL("../../../data/pix_us_states.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable().define(["md"], _1);
  main.variable().define("key", ["Legend","chart"], _key);
  main.variable(observer("chart")).define("chart", ["UsStateChoropleth","unemployment","namemap","d3"], _chart);
  main.variable().define("unemployment", ["FileAttachment"], _unemployment);
  main.variable().define("namemap", ["states"], _namemap);
  main.variable().define("UsStateChoropleth", ["states","statemesh","Choropleth"], _UsStateChoropleth);
  const child1 = runtime.module(define1);
  main.import("howto", child1);
  const child2 = runtime.module(define2);
  main.import("us", child2);
  main.import("states", child2);
  main.import("statemesh", child2);
  main.import("Choropleth", child2);
  main.import("Legend", child2);
  return main;
}
