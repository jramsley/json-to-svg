const fs = require('fs');
const path = require('path');

const BoundingBox = require('./lib/BoundingBox');
const Circle = require('./lib/Circle');
const CircularArc = require('./lib/CircularArc');
const Line = require('./lib/Line');
const Spline = require('./lib/Spline');
const Svg = require('./lib/Svg');

const file = process.argv[2];
if (!file) {
  throw new Error('No file provided');
}

const jsoneFileName = path.parse(file).name + '.svg';
const json = JSON.parse(fs.readFileSync(file, 'utf-8'));

const svg = new Svg();
json.bodyData.forEach(a => {
  const type = a.type;
  switch (type) {
    case 'line':
      console.log(a.data);
      const line = new Line({ data: a.data });
      svg.add(line);
      break;
    case 'circle':
      const circle = new Circle({ data: a.data });
      svg.add(circle);
      break;
    case 'circularArc':
      if(Math.abs(a.data.start[1] - a.data.end[1]) < 10**-9) {
        const line = new Line({ data: a.data });
        svg.add(line);
      } else {
        const circularArc = new CircularArc({ data: a.data });
        svg.add(circularArc);
      }
      break;
    case 'spline':
      const spline = new Spline({ data: a.data });
      svg.add(spline);
      break;
    default:
      console.log('not a line/circle', type);
  }
});

console.log(svg.print());
fs.writeFileSync(jsoneFileName, svg.print());
