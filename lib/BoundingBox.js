class BoundingBox {
  constructor() {
    this.min = {
      x: undefined,
      y: undefined
    };
    this.max = {
      x: undefined,
      y: undefined
    };
  }

  update(...args) {
    args.forEach(points => {
      if (points instanceof BoundingBox) {
        this.min.x = this.min.x !== undefined ? Math.min(this.min.x, points.min.x) : points.min.x;
        this.min.y = this.min.y !== undefined ? Math.min(this.min.y, points.min.y) : points.min.y;
        this.max.x = this.max.x !== undefined ? Math.max(this.max.x, points.max.x) : points.max.x;
        this.max.y = this.max.y !== undefined ? Math.max(this.max.y, points.max.y) : points.max.y;
      } else if (Array.isArray(points)) {
        this.min.x = this.min.x !== undefined ? Math.min(this.min.x, points[0]) : points[0];
        this.min.y = this.min.y !== undefined ? Math.min(this.min.y, points[1]) : points[1];
        this.max.x = this.max.x !== undefined ? Math.max(this.max.x, points[0]) : points[0];
        this.max.y = this.max.y !== undefined ? Math.max(this.max.y, points[1]) : points[1];
      } else if (points.min && points.min.hasOwnProperty('x') && points.min.hasOwnProperty('y') && points.max && points.max.hasOwnProperty('x') && points.max.hasOwnProperty('y')) {
        this.min.x = this.min.x !== undefined ? Math.min(this.min.x, points.min.x) : points.min.x;
        this.min.y = this.min.y !== undefined ? Math.min(this.min.y, points.min.y) : points.min.y;
        this.max.x = this.max.x !== undefined ? Math.max(this.max.x, points.max.x) : points.max.x;
        this.max.y = this.max.y !== undefined ? Math.max(this.max.y, points.max.y) : points.max.y;
      } else if (points.hasOwnProperty('x') && points.hasOwnProperty('y')) {
        this.min.x = this.min.x !== undefined ? Math.min(this.min.x, points.x) : points.x;
        this.min.y = this.min.y !== undefined ? Math.min(this.min.y, points.y) : points.y;
        this.max.x = this.max.x !== undefined ? Math.max(this.max.x, points.x) : points.x;
        this.max.y = this.max.y !== undefined ? Math.max(this.max.y, points.y) : points.y;
      } else {
        throw new Error('No points provided');
      }
    });
  }
}

module.exports = BoundingBox;
