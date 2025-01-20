export default class Point {
  constructor(x, y, time) {
    this.x = x;
    this.y = y;
    this.time = time || new Date().getTime();
  }

  pointsToSvg(points) {
    if (points.length === 0) return "";

    let path = `M ${points[0].x},${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x},${points[i].y}`;
    }

    return path;
  }
}
