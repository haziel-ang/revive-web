// Static instrument illustrations. The drawing uses no visitor or lookup data.
for (const canvas of document.querySelectorAll('.art')) {
  const ctx = canvas.getContext('2d');
  if (!ctx) continue;
  ctx.translate(310,160);
  ctx.strokeStyle = '#62acaa';
  ctx.lineWidth = 1.3;
  const pi = Math.PI;
  for (let y=-154;y<160;y+=20) {
    for (let x=-290;x<300;x+=20) {
      ctx.fillStyle = 'rgba(162,222,209,.25)';
      ctx.fillRect(x,y,1.7,1.7);
    }
  }
  ctx.rotate(-.22);
  if (canvas.dataset.art === 'globe') {
    const radius=136;
    function project(lat, lon) {
      const x=Math.cos(lat)*Math.sin(lon), y=Math.sin(lat), z=Math.cos(lat)*Math.cos(lon);
      return [radius*x, -radius*(y*.94-z*.342), y*.342+z*.94];
    }
    function curve(points) {
      ctx.beginPath();
      let visible=false;
      for (const [x,y,z] of points) {
        if (z>=0) {if (visible) ctx.lineTo(x,y); else ctx.moveTo(x,y);}
        visible=z>=0;
      }
      ctx.stroke();
    }
    const angles=Array.from({length:181},(_,i)=>i*pi/90-pi);
    for(let n=-8;n<=8;n++) curve(angles.map(a=>project(n*pi/18,a)));
    for(let n=0;n<30;n++) curve(angles.map(a=>project(a/2,n*pi/15)));
    ctx.beginPath();ctx.arc(0,0,radius,0,2*pi);ctx.stroke();
    ctx.strokeStyle='#a1f3d6';ctx.lineWidth=2;
    const stations=[project(.62,-.6),project(.3,.6),project(-.32,.18)];
    for (const [start,end] of [[0,1],[1,2],[2,0]]) {
      const [x,y]=stations[start], [u,v]=stations[end];
      ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo((x+u)/2,(y+v)/2-38,u,v);ctx.stroke();
    }
    for (const [x,y] of stations) {
      ctx.fillStyle='#c7ffe8';ctx.beginPath();ctx.arc(x,y,5,0,2*pi);ctx.fill();
    }
  } else {
    for(let i=1;i<=13;i++){
      ctx.beginPath();ctx.ellipse(0,0,i*9,i*11,.4,.16*i,pi*2-.04*i);ctx.stroke();
    }
  }
}