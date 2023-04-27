import define1 from "./a1fd3857bac219b0@480.js";
import define2 from "./a33468b95d0b15b0@808.js";

function _1(md){return(
md`# Treemap, JSON

This [treemap](/@d3/treemap) example demonstrates how to use hierarchical JSON as a data source.`
)}

function _key(Swatches,chart){return(
Swatches(chart.scales.color)
)}

function _chart(Treemap,flare){return(
Treemap(flare, {
  value: d => d.size, // size of each node (file); null for internal nodes (folders)
  group: (d, n) => n.ancestors().slice(-2)[0].data.name, // e.g., "animate" in flare/animate/Easing; color
  label: (d, n) => [...d.name.split(/(?=[A-Z][a-z])/g), n.value.toLocaleString("en")].join("\n"),
  title: (d, n) => `${n.ancestors().reverse().map(d => d.data.name).join(".")}\n${n.value.toLocaleString("en")}`,
  width: 1152,
  height: 1152
})
)}

function _flare(FileAttachment){return(
FileAttachment("objs@2.json").json()
)}

function _7(howto){return(
howto("Treemap", {specifier: "@d3/treemap"})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["objs@2.json", {url: new URL("../data/719bd479058d154e5a8da6fbc57f3fa6b406afd8102b1ae75ba3d091875d012339dbfa19adb1f7960be4ef785c487bd884392e44395e6a90babaccadae39b717.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("key")).define("key", ["Swatches","chart"], _key);
  main.variable(observer("chart")).define("chart", ["Treemap","flare"], _chart);
  main.variable(observer("flare")).define("flare", ["FileAttachment"], _flare);
  const child1 = runtime.module(define1);
  main.import("Treemap", child1);
  const child2 = runtime.module(define2);
  main.import("Swatches", child2);
  main.variable(observer()).define(["howto"], _7);
  return main;
}
