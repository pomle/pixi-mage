export function drawArea(context, area, color) {
  context.setLineDash([4, 2]);
  context.lineWidth = 1;
  context.beginPath();
  context.strokeStyle = color;
  context.rect(area.x, area.y, area.w, area.h);
  context.stroke();
}