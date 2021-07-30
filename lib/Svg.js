const BoundingBox = require('./BoundingBox');

class Svg {
  constructor(config = {}) {
    this.BoundingBox = new BoundingBox();
    this.items = [];
    this.id = config.id;
  }

  add(item) {
    if (!item.BoundingBox) {
      throw new Error('Trying to add non-Svg item');
    }

    this.BoundingBox.update(item.BoundingBox);
    this.items.push(item);
  }

  print() {
    const lines = this.items.map(item => '  ' + item.toSvg());
    const lengthBuffer = .1 * (this.BoundingBox.max.x - this.BoundingBox.min.x);
    const heightBuffer = .1 * (this.BoundingBox.max.y - this.BoundingBox.min.y);
    lines.unshift(`<svg id="${this.id}" xmlns="http://www.w3.org/2000/svg" viewBox="${this.BoundingBox.min.x - lengthBuffer} ${this.BoundingBox.min.y - heightBuffer} ${2 * lengthBuffer + (this.BoundingBox.max.x - this.BoundingBox.min.x)} ${2 * heightBuffer + (this.BoundingBox.max.y - this.BoundingBox.min.y)}">`);
    lines.push('</svg>');
    return lines.join('\n');
  }
}

module.exports = Svg;
