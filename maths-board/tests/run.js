// Usage: node tests/run.js [outdir]   (needs Playwright + Chromium)
// Opens the app, validates every lesson, checks every step's finished board
// for text that runs off the board or overlaps, and screenshots every step.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const root=path.join(__dirname,'..'),out=process.argv[2]||path.join(root,'tests','shots');fs.mkdirSync(out,{recursive:true});
 const page=fs.readFileSync(path.join(root,'dist','index.html'),'utf8'); // run build.py first
 const tmp=path.join(out,'_page.html');fs.writeFileSync(tmp,page);
 const b=await chromium.launch(),errs=[];let fail=0;
 const p=await b.newPage({viewport:{width:1280,height:900}});p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+tmp+'#board');try{await p.waitForFunction(()=>window.MB&&window.MB.ready,null,{timeout:20000})}catch(e){console.log('app did not start:',errs.join(' | ')||e.message);process.exit(1)}
 const v=await p.evaluate(()=>MB.validate()),l=await p.evaluate(()=>MB.layoutIssues());
 console.log('validator:',v.length?v.join('\n  '):'ok');console.log('layout:',l.length?l.join('\n  '):'ok');fail+=v.length+l.length;
 const steps=await p.evaluate(()=>MB.LESSONS.map(L=>[L.id,L.steps.length]));
 for(const [id,n] of steps)for(let i=0;i<n;i++){await p.evaluate(([id,i])=>MB.show(id,i),[id,i]);await p.waitForTimeout(60);
   await (await p.$('.board')).screenshot({path:path.join(out,`${id}-step${i+1}.png`)})}
 await p.evaluate(()=>MB.show('frac-add-unlike',2,4200));await p.waitForTimeout(60);await p.screenshot({path:path.join(out,'desktop-mid-step3.png')});
 const m=await b.newPage({viewport:{width:390,height:844}});m.on('pageerror',e=>errs.push(e.message));
 await m.goto('file://'+tmp+'#home');await m.waitForFunction(()=>window.MB&&window.MB.ready);await m.waitForTimeout(200);await m.screenshot({path:path.join(out,'phone-home.png')});
 await m.evaluate(()=>MB.show('frac-add-unlike',3,3000));await m.waitForTimeout(60);await m.screenshot({path:path.join(out,'phone-board.png'),fullPage:true});
 const hov=await m.evaluate(()=>document.documentElement.scrollWidth>innerWidth);if(hov){console.log('phone: horizontal scroll');fail++}
 console.log('page errors:',errs.length?errs.join('\n  '):'none');fail+=errs.length;fs.unlinkSync(tmp);await b.close();process.exit(fail?1:0)})();
