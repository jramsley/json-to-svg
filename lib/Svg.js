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
    lines.unshift(`<svg id="${this.id}" xmlns="http://www.w3.org/2000/svg" viewBox="${1.1 * this.BoundingBox.min.x} ${1.1 * this.BoundingBox.min.y} ${1.1 * (this.BoundingBox.max.x - this.BoundingBox.min.x)} ${1.1 * (this.BoundingBox.max.y - this.BoundingBox.min.y)}">`);
    lines.push('</svg>');
    return lines.join('\n');
  }
}

module.exports = Svg;
