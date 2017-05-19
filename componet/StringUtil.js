
//距离显示优化
function calcDistance(distance) {
  if (distance < 500) {
    return distance + "m";
  } else if (distance < 1000) {
    var dis = Math.round(distance * 10) / 10;
    return dis + "m";
  } else {
    var dis = Math.round(distance / 1000 * 10) / 10;
    return dis + "km";
  }
}

module.exports = {
  calcDistance: calcDistance
}