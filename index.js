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

const right = file.includes('Right');

const jsoneFileName = path.parse(file).name + '.svg';
const json = JSON.parse(fs.readFileSync(file, 'utf-8'));

const svg = new Svg();
json.bodyData.forEach(a => {
  if(right) {
    Object.keys(a.data).forEach(key => {
      if(Array.isArray(a.data[key]) && a.data[key].length === 3 && typeof a.data[key][0] === 'number') {
        const x =  a.data[key][1];
        const y = -a.data[key][0];
        a.data[key][0] = x;
        a.data[key][1] = y;
      }

      if(key === 'controlPoints') {
        a.data.controlPoints = a.data.controlPoints.map(controlPoint => {
          const x =  controlPoint[1];
          const y = -controlPoint[0];
          const z = controlPoint[2];

          return [x, y, z];
        });
      }
    });
  }
  const type = a.type;
  switch (type) {
    case 'line':
      const line = new Line({ data: a.data });
      svg.add(line);
      break;
    case 'circle':
      const circle = new Circle({ data: a.data });
      svg.add(circle);
      break;
    case 'circularArc':
      if ( Math.abs(a.data.axisDir[2]) < 1e-8 ) {
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

fs.writeFileSync(jsoneFileName, svg.print());
