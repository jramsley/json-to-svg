const BaseEntity = require('./BaseEntity');
const BoundingBox = require('./BoundingBox');

function angle({ start, end, center, axis }) {
  let startAngle;
  let endAngle;
  if (start.y - center.y < 0) {
    startAngle = 2 * Math.PI + Math.atan2(start.y - center.y, start.x - center.x);
  } else {
    startAngle = Math.atan2(start.y - center.y, start.x - center.x);
  }

  if (end.y - center.y < 0) {
    endAngle = 2 * Math.PI + Math.atan2(end.y - center.y, end.x - center.x);
  } else {
    endAngle = Math.atan2(end.y - center.y, end.x - center.x);
  }

  if ( axis < 0 ) {
    if (startAngle < endAngle) {
      return 2 * Math.PI - (endAngle - startAngle);
    } else {
      return (endAngle - startAngle);
    }
  } else {
    if (startAngle < endAngle) {
      return (endAngle - startAngle);
    } else {
      return 2 * Math.PI - (startAngle - endAngle);
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
    this.radius = config.data.radius * this.size;
    this.sweepFlag = config.data.axisDir[2] < 0 ? 0 : 1;
    const a = (angle({ start: this.start, end: this.end, center: this.center, axis: config.data.axisDir[2] }) % (2 * Math.PI));
    this.largeArcFlag = a < Math.PI ? 0 : 1;

    this.BoundingBox.update({ x: this.center.x - this.radius, y: this.center.y - this.radius}, { x: this.center.x + this.radius, y: this.center.y + this.radius});
  }

  toSvg() {
    return `<path d="M ${this.start.x} ${this.start.y} A ${this.radius} ${this.radius} 0 ${this.largeArcFlag} ${this.sweepFlag} ${this.end.x} ${this.end.y}" stroke="${this.stroke}" stroke-width="${this.width}" fill="${this.fill}" stroke-linecap="${this.cap}"/>`;
  }
}

module.exports = CircularArc;
