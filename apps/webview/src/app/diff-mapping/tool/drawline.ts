

export function draw_line(parent,old_one:HTMLElement,new_one:HTMLElement){
    var c = parent.canvas.getContext('2d');
    c.beginPath();
    c.moveTo(old_one.offsetLeft+old_one.offsetWidth,old_one.offsetTop+old_one.offsetHeight/2);
    c.lineTo(new_one.offsetLeft,new_one.offsetTop+new_one.offsetHeight/2);
    c.lineWidth = 3;
    c.strokeStyle = '#ff0000';
    c.stroke();
  }