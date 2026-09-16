const TAU=Math.PI*2;
function build({height,baseR,taper,lean,turns,squash,phase=0.9,N=420,dp:d=1}){
  const ax=t=>lean*Math.pow(t,1.75), ay=t=>-height*t, r=t=>baseR*(1-taper*t), th=t=>-TAU*turns*t+phase;
  const f=([x,y])=>`${x.toFixed(d)},${y.toFixed(d)}`;
  // cone as quadratic approx
  const m=0.5, axm=ax(m), rm=r(m), aym=ay(m);
  const cL=[2*(axm-rm)-0.5*(-baseR)-0.5*(ax(1)-r(1)), 2*aym-0.5*0-0.5*ay(1)];
  const cR=[2*(axm+rm)-0.5*(baseR)-0.5*(ax(1)+r(1)), 2*aym-0.5*0-0.5*ay(1)];
  const cone=`M${-baseR},0 Q${cL[0].toFixed(d)},${cL[1].toFixed(d)} ${(ax(1)-r(1)).toFixed(d)},${ay(1).toFixed(d)} L${(ax(1)+r(1)).toFixed(d)},${ay(1).toFixed(d)} Q${cR[0].toFixed(d)},${cR[1].toFixed(d)} ${baseR},0 Z`;
  // front arcs, each carrying its local radius so we can taper width
  const arcs=[];let run=[];
  for(let i=0;i<=N;i++){const t=i/N,a=th(t);
    if(Math.cos(a)>0.02) run.push({p:[ax(t)+r(t)*Math.sin(a), ay(t)+r(t)*Math.cos(a)*squash], w:r(t)});
    else {if(run.length>4)arcs.push(run);run=[];}}
  if(run.length>4)arcs.push(run);
  return {cone, arcs:arcs.map(a=>({d:'M'+a.map(o=>f(o.p)).join('L'), w:a[Math.floor(a.length/2)].w}))};
}
const V=build({height:262,baseR:29,taper:0.87,lean:44,turns:4.4,squash:0.36});
console.log(JSON.stringify(V));
