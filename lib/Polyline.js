const BaseEntity = require('./BaseEntity');
const BoundingBox = require('./BoundingBox');

class Polyline extends BaseEntity {
  constructor(config = {}) {
    super(config);
    this.vertices = config.data;

    this.BoundingBox.update(...this.vertices);
  }

  toSvg() {
    const d = this.vertices.reduce((acc, point, index) => {
      acc += (index === 0) ? 'M' : 'L';
      acc += `${point.x},${point.y}`;
      return acc;
    }, '');
    return `<path d="${d}" stroke="${this.stroke}" stroke-width="${this.width}" fill="${this.fill}" stroke-linecap="${this.cap}"/>`;
  }
}

module.exports = Polyline;
