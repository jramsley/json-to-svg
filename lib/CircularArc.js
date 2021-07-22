const BaseEntity = require('./BaseEntity');
const BoundingBox = require('./BoundingBox');

function angle({ start, end, radius }) {
  const length = Math.sqrt( (start.x - end.x) ** 2 + (start.y - end.y) ** 2);
  return 2 * Math.asin(length / (2 * radius));
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
    this.sweepFlag = config.data.axisDir[2] === -1 ? 0 : 1;
    this.largeArcFlag = angle({ start: this.start, end: this.end, radius: this.radius}) < Math.PI ? 0 : 1;

    this.BoundingBox.update({ x: this.center.x - this.radius, y: this.center.y - this.radius}, { x: this.center.x + this.radius, y: this.center.y + this.radius});
  }

  toSvg() {
    return `<path d="M ${this.start.x} ${this.start.y} A ${this.radius} ${this.radius} 0 ${this.largeArcFlag} ${this.sweepFlag} ${this.end.x} ${this.end.y}" stroke="${this.stroke}" stroke-width="${this.width}" fill="${this.fill}" stroke-linecap="${this.cap}"/>`;
  }
}

module.exports = CircularArc;
