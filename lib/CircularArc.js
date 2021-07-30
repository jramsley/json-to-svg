const BaseEntity = require('./BaseEntity');
const BoundingBox = require('./BoundingBox');

function getAngle({ coordinates, center }) {
  if (coordinates.y - center.y < 0) {
    return 2 * Math.PI + Math.atan2(coordinates.y - center.y, coordinates.x - center.x);
  } else {
    return Math.atan2(coordinates.y - center.y, coordinates.x - center.x);
  }
}

function angleDiff({ start, end, axis }) {
  if ( axis < 0 ) {
    if (start < end) {
      return 2 * Math.PI - (end - start);
    } else {
      return (end - start);
    }
  } else {
    if (start < end) {
      return (end - start);
    } else {
      return 2 * Math.PI - (start - end);
    }
  }
}

class CircularArc extends BaseEntity {
  constructor(config = {}) {
    super(config);
    this.center = {
      x: config.data.center[0] * this.size,
      y: config.data.center[1] * this.size
    };
    this.start = {
      x: config.data.start[0] * this.size,
      y: config.data.start[1] * this.size
    };
    this.end = {
      x: config.data.end[0] * this.size,
      y: config.data.end[1] * this.size
    };
    const axis = config.data.axisDir[2];
    this.radius = config.data.radius * this.size;
    this.sweepFlag = axis < 0 ? 0 : 1;
    const startAngle = getAngle({ coordinates: this.start, center: this.center });
    const endAngle = getAngle({ coordinates: this.end, center: this.center });
    const angle = angleDiff({ start: startAngle, end: endAngle, axis: axis });
    const normalizedAngle = Math.abs(angle % (2 * Math.PI));
    this.largeArcFlag = normalizedAngle < Math.PI ? 0 : 1;

    this.BoundingBox.update(this.start);
    this.BoundingBox.update(this.end);

    const startQuadrant = Math.floor(2 * startAngle / Math.PI) % 4;
    const endQuadrant = Math.floor(2 * endAngle / Math.PI) % 4;

    if (startQuadrant === endQuadrant && normalizedAngle > (Math.PI / 2)) {
      //this.BoundingBox.update({ x: this.center.x - this.radius, y: this.center.y - this.radius}, { x: this.center.x + this.radius, y: this.center.y + this.radius});
    } else if (startQuadrant !== endQuadrant) {
      const points = [...Array(4).keys()].map(rotation => rotation * Math.PI / 2);
      let i = startQuadrant;
      while (i !== endQuadrant) {
        if (axis < 0) {
          this.BoundingBox.update({ x: this.center.x + Math.abs(axis) * this.radius * Math.cos(points[i]), y: this.center.y + Math.abs(axis) * this.radius * Math.sin(points[i]) });
          i--;
          i = i === -1 ? 3 : i;
        } else {
          i++;
          i = i === 4 ? 0 : i;
          this.BoundingBox.update({ x: this.center.x + Math.abs(axis) * this.radius * Math.cos(points[i]), y: this.center.y + Math.abs(axis) * this.radius * Math.sin(points[i]) });
        }
      }
    }
  }

  toSvg() {
    return `<path d="M ${this.start.x} ${this.start.y} A ${this.radius} ${this.radius} 0 ${this.largeArcFlag} ${this.sweepFlag} ${this.end.x} ${this.end.y}" stroke="${this.stroke}" stroke-width="${this.width}" fill="${this.fill}" stroke-linecap="${this.cap}"/>`;
  }
}

module.exports = CircularArc;
