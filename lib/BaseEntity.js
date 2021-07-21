const defaults = require('../config');
const BoundingBox = require('./BoundingBox');

class BaseEntity {
  constructor(config = {}) {
    this.stroke = config.stroke || defaults.stroke;
    this.width = config.width || defaults.width;
    this.fill = config.fill || defaults.fill;
    this.size = config.size || defaults.size;
    this.cap = config.cap || defaults.cap;
    this.BoundingBox = new BoundingBox();
  }
}

module.exports = BaseEntity;
