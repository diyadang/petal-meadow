// Renders the app icons from the in-app pet drawing.
const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();
const url='file://'+path.resolve(__dirname,'../docs/index.html');
await p.goto(url);
await p.evaluate(()=>localStorage.setItem('petal-meadow-v2',JSON.stringify({v:2,pets:[{id:'i',species:'calico',name:'x',purpose:'day',label:'',goal:5,fed:5,born:0,tasks:[],eaten:[],home:false}],active:'i',days:{},seen:{}})));
await p.reload();await p.waitForTimeout(300);
const svg=await p.$eval('#hero svg',s=>s.outerHTML.replace(/class="(bob|blink|spark)"/g,''));
const bg=await p.$eval('#scene svg.bg',s=>s.outerHTML);
for(const n of [180,192,512]){
  await p.setViewportSize({width:n,height:n});
  await p.setContent(`<style>html,body{margin:0}.i{width:${n}px;height:${n}px;position:relative;overflow:hidden;background:#ffd3e2}.i svg.bg{position:absolute;inset:0;width:100%;height:100%}.i .pet{position:absolute;left:12%;right:12%;bottom:4%}.i .pet svg{width:100%;display:block}</style><div class="i">${bg.replace('class="bg"','class="bg" style="transform:scale(1.6);transform-origin:50% 100%"')}<div class="pet">${svg}</div></div>`);
  await p.screenshot({path:path.resolve(__dirname,`../docs/icons/icon-${n}.png`)});
}
await b.close();console.log('icons done')})();
