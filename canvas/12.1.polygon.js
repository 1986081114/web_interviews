/* 
创建多边形需要指定 圆心 半径 边数 第一个起点的起始角度， 描边，填充风格，是否填充
*/

let Point = function(x, y) {
    this.x = x;
    this.y = y;
}
var Polygon = function (centerX, centerY, radius, sides, startAngle, strokeStyle, fillStyle, filled) {
    this.x = centerX;
    this.y = centerY;
    this.radius = radius;
    this.sides = sides;
    this.startAngle = startAngle;
    this.strokeStyle = strokeStyle;
    this.fillStyle = fillStyle;
    this.filled = filled;
    
    // 获取每个顶点坐标
    this.getPoint = function() {
        let points = [],
            angel = this.startAngle || 0;
        
        for(let i = 0; i < this.sides; ++i) {

            points.push(new Point(this.x + this.radius * Math.sin(angel),
                                  this.y + this.radius * Math.cos(angel)));
            angel += 2 * Math.PI / this.sides;
        }
        return points
    }

    this.createPath = function(context) {
        let points = this.getPoint();
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        for(let i = 0; i< this.sides; ++i) {
            context.lineTo(points[i].x, points[i].y);
        }
        context.closePath();
    }

    this.stroke = function(context) {
        context.save();
        this.createPath(context);
        context.strokeStyle = 'red';
        context.stroke();
        context.restore();
    }

    this.fill = function(context) {
        context.save();
        this.createPath(context);
        context.fillStyle = this.fillStyle;
        context.fill();
        context.restore();
    }

    this.move = function(x, y) {
        this.x = x;
        this.y = y;
    }
 };
