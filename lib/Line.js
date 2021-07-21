const BaseEntity = require('./BaseEntity');
const BoundingBox = require('./BoundingBox');

class Line extends BaseEntity {
  constructor(config = {}) {
    super(config);
    this.start = {
      x: config.data.start[0] * this.size,
      y: config.data.start[1] * this.size
    };
    this.end = {
      x: config.data.end[0] * this.size,
      y: config.data.end[1] * this.size
    };

    this.BoundingBox.update(this.start, this.end);
  }

  toSvg() {
    return `<line x1="${this.start.x}" y1="${this.start.y}" x2="${this.end.x}" y2="${this.end.y}" stroke="${this.stroke}" stroke-width="${this.width}" stroke-linecap="${this.cap}"/>`;
  }
}

module.exports = Line;
