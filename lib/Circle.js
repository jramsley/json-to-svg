const BaseEntity = require('./BaseEntity');
const BoundingBox = require('./BoundingBox');

class Circle extends BaseEntity {
  constructor(config = {}) {
    super(config);
    this.center = {
      x: config.data.center[0] * this.size,
      y: config.data.center[1] * this.size
    };
    this.radius = config.data.radius * this.size;

    this.BoundingBox.update({ x: this.center.x - this.radius, y: this.center.y - this.radius}, { x: this.center.x + this.radius, y: this.center.y + this.radius});
  }

  toSvg() {
    return `<circle cx="${this.center.x}" cy="${this.center.y}" r="${this.radius}" stroke="${this.stroke}" stroke-width="${this.width}" fill="${this.fill}" stroke-linecap="${this.cap}"/>`;
  }
}

module.exports = Circle;
