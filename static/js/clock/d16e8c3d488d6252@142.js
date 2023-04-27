// https://observablehq.com/@mbostock/polar-clock@142
function _1(md){return(
md`# Polar Clock`
)}

function* _chart(d3,width,height,fields,dotRadius,color,Promises)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("text-anchor", "middle")
      .style("display", "block")
      .style("font", "500 14px var(--sans-serif)");

  const field = svg.append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`)
    .selectAll("g")
    .data(fields)
    .join("g");

  field.append("circle")
      .attr("fill", "none")
      .attr("stroke", "currentColor")
      .attr("stroke-width", 1.5)
      .attr("r", d => d.radius);

  const fieldTick = field.selectAll("g")
      .data(d => {
        const date = d.interval(new Date(2000, 0, 1));
        d.range = d.subinterval.range(date, d.interval.offset(date, 1));
        return d.range.map(t => ({time: t, field: d}));
      })
    .join("g")
      .attr("class", "field-tick")
      .attr("transform", (d, i) => {
        const angle = i / d.field.range.length * 2 * Math.PI - Math.PI / 2;
        return `translate(${Math.cos(angle) * d.field.radius},${Math.sin(angle) * d.field.radius})`;
      });

  const fieldCircle = fieldTick.append("circle")
      .attr("r", dotRadius)
      .attr("fill", "white")
      .style("color", (d, i) => color(i / d.field.range.length * 2 * Math.PI))
      .style("transition", "fill 750ms ease-out");

  fieldTick.append("text")
      .attr("dy", "0.35em")
      .attr("fill", "#222")
      .text(d => d.field.format(d.time).slice(0, 2));

  const fieldFocus = field.append("circle")
      .attr("r", dotRadius)
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-width", 3)
      .attr("cy", d => -d.radius)
      .style("transition", "transform 500ms ease");
  
  yield update(Math.floor((Date.now() + 1) / 1000) * 1000);
  
  while (true) {
    const then = Math.ceil((Date.now() + 1) / 1000) * 1000;
    yield Promises.when(then, then).then(update);
  }

  function update(then) {
    for (const d of fields) {
      const start = d.interval(then);
      const index = d.subinterval.count(start, then);
      d.cycle = (d.cycle || 0) + (index < d.index);
      d.index = index;
    }
    fieldCircle.attr("fill", (d, i) => i === d.field.index ? "currentColor" : "white");
    fieldFocus.attr("transform", d => `rotate(${(d.index / d.range.length + d.cycle) * 360})`);
    return svg.node();
  }
}


function _fields(radius,d3){return(
[
  {radius: 0.2 * radius, interval: d3.timeYear,   subinterval: d3.timeMonth,  format: d3.timeFormat("%b")},
  {radius: 0.3 * radius, interval: d3.timeMonth,  subinterval: d3.timeDay,    format: d3.timeFormat("%d")},
  {radius: 0.4 * radius, interval: d3.timeWeek,   subinterval: d3.timeDay,    format: d3.timeFormat("%a")},
  {radius: 0.6 * radius, interval: d3.timeDay,    subinterval: d3.timeHour,   format: d3.timeFormat("%H")},
  {radius: 0.7 * radius, interval: d3.timeHour,   subinterval: d3.timeMinute, format: d3.timeFormat("%M")},
  {radius: 0.8 * radius, interval: d3.timeMinute, subinterval: d3.timeSecond, format: d3.timeFormat("%S")}
]
)}

function _width(){return(
954
)}

function _height(width){return(
width
)}

function _radius(width){return(
width / 1.67
)}

function _armRadius(radius){return(
radius / 22
)}

function _dotRadius(armRadius){return(
armRadius - 9
)}

function _color(d3){return(
d3.scaleSequential([0, 2 * Math.PI], d3.interpolateRainbow)
)}

function _arcArm(d3,armRadius){return(
d3.arc()
    .startAngle(d => armRadius / d.radius)
    .endAngle(d => -Math.PI - armRadius / d.radius)
    .innerRadius(d => d.radius - armRadius)
    .outerRadius(d => d.radius + armRadius)
    .cornerRadius(armRadius)
)}

function _d3(require){return(
require("d3@6")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["d3","width","height","fields","dotRadius","color","Promises"], _chart);
  main.variable(observer("fields")).define("fields", ["radius","d3"], _fields);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("height")).define("height", ["width"], _height);
  main.variable(observer("radius")).define("radius", ["width"], _radius);
  main.variable(observer("armRadius")).define("armRadius", ["radius"], _armRadius);
  main.variable(observer("dotRadius")).define("dotRadius", ["armRadius"], _dotRadius);
  main.variable(observer("color")).define("color", ["d3"], _color);
  main.variable(observer("arcArm")).define("arcArm", ["d3","armRadius"], _arcArm);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  return main;
}
