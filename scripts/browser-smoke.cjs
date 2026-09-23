// Isolated browser smoke: all remote services are intercepted; no production accounts or data are used.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const tokenPart = data => Buffer.from(JSON.stringify(data)).toString('base64url');
const now = Math.floor(Date.now() / 1000);
const token = `${tokenPart({alg:'none'})}.${tokenPart({sub:'recovery-test',user_id:'recovery-test',iat:now,exp:now+3600,aud:'demo-voz-amiga'})}.test`;
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4200';
(async()=>{
 const server = process.env.TEST_BASE_URL ? undefined : require('node:http').createServer((req,res)=>{
  let pathname = new URL(req.url,base).pathname;
  if (!path.extname(pathname)) pathname='/index.html';
  const root=path.resolve(__dirname,'../www');
  const file=path.resolve(root,'.'+pathname);
  if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  fs.readFile(file,(error,data)=>{if(error){res.writeHead(404);res.end();return;}
   res.setHeader('Content-Type', {'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png'}[path.extname(file)] || 'application/octet-stream');res.end(data);});
 });
 if(server) await new Promise(resolve=>server.listen(4200,'127.0.0.1',resolve));
 const browser = await chromium.launch({headless:true, ...(process.env.CHROME_BIN ? {executablePath:process.env.CHROME_BIN} : {}),args:['--no-sandbox','--disable-dev-shm-usage']});
 try {
  const context = await browser.newContext({viewport:{width:390,height:844}});
  await context.route('**/*', async route => {
   const url = route.request().url();
   if (url.startsWith(base)) return route.continue();
   if (url.includes('identitytoolkit.googleapis.com')) {
    const payload=url.includes('accounts:signInWithPassword')
      ? {localId:'recovery-test',email:'teste@example.invalid',idToken:token,refreshToken:'fake-refresh',expiresIn:'3600',registered:true}
      : {users:[{localId:'recovery-test',email:'teste@example.invalid',emailVerified:true,createdAt:String(Date.now()),lastLoginAt:String(Date.now()),providerUserInfo:[{providerId:'password',email:'teste@example.invalid',federatedId:'teste@example.invalid'}]}]};
    return route.fulfill({status:200,contentType:'application/json',body:JSON.stringify(payload)});
   }
   if(url.includes('firestore.googleapis.com')) return route.fulfill({status:403,contentType:'application/json',body:JSON.stringify({error:{code:403,status:'PERMISSION_DENIED',message:'Simulated denied profile access'}})});
   return route.abort();
  });
  // Exercise actual browser speech adapter with a fake device engine, avoiding missing system voices.
  await context.addInitScript(()=>{
   window.__speech=[];
   Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[],cancel:()=>{},speak:u=>{window.__speech.push({text:u.text,rate:u.rate,pitch:u.pitch});setTimeout(()=>u.onend?.(new Event('end')),10);}},configurable:true});
  });
  const page = await context.newPage();
  const runtimeErrors=[];page.on('pageerror',e=>runtimeErrors.push(e.message));
  await page.goto(base+'/perfil');
  await page.waitForURL('**/home');
  await page.locator('input[type="email"]').fill('teste@example.invalid');
  await page.locator('input[type="password"]').fill('senha-ficticia');
  await page.locator('ion-button[type="submit"]').click();
  await page.waitForURL('**/inicial');
  const routes=['alimentos','necessidades','sentimentos','brincar','pessoas','locais'];
  for(const width of [320,768,1280]){
   await page.setViewportSize({width,height:900});
   for(const route of routes){
    await page.goto(base+'/'+route);
    await page.locator('.frase-falar').first().waitFor();
    assert.equal(await page.locator('.frase-falar').count(),6,route);
    await page.waitForFunction(()=>Array.from(document.querySelectorAll('.frase-falar img')).every(i=>i.complete&&i.naturalWidth>0));
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
    assert.equal(overflow,false,`${route} at ${width}`);
   }
  }
  await page.setViewportSize({width:390,height:844});
  await page.goto(base+'/alimentos');
  await page.getByRole('button',{name:'Falar: Quero água',exact:true}).click();
  await page.waitForFunction(()=>window.__speech.some(s=>s.text==='Quero água'));
  await page.getByRole('button',{name:'Adicionar aos favoritos: Quero água',exact:true}).click();
  await page.getByRole('button',{name:'Remover dos favoritos: Quero água',exact:true}).waitFor();
  await page.goto(base+'/favoritos');
  await page.getByRole('button',{name:'Falar: Quero água',exact:true}).waitFor();
  await page.getByRole('button',{name:'Remover dos favoritos: Quero água',exact:true}).click();
  await page.getByText('Você ainda não tem favoritos.',{exact:false}).waitFor();
  await page.goto(base+'/alimentos');
  await page.getByRole('button',{name:'Adicionar aos favoritos: Quero água',exact:true}).waitFor();
  await page.getByRole('button',{name:'Adicionar aos favoritos: Quero leite',exact:true}).click();
  await page.getByRole('button',{name:'Remover dos favoritos: Quero leite',exact:true}).waitFor();
  await page.goto(base+'/favoritos');
  await page.getByRole('button',{name:'Falar: Quero leite',exact:true}).waitFor();
  assert.equal(await page.getByRole('button',{name:'Falar: Quero água',exact:true}).count(),0);
  await page.getByRole('button',{name:'Falar: Quero leite',exact:true}).focus();
  await page.keyboard.press('Enter');
  await page.waitForFunction(()=>window.__speech.some(s=>s.text==='Quero leite'));
  if(process.env.SCREENSHOT_DIR){
   fs.mkdirSync(process.env.SCREENSHOT_DIR,{recursive:true});
   await page.screenshot({path:path.join(process.env.SCREENSHOT_DIR,'favoritos-mobile.png'),fullPage:true});
   await page.goto(base+'/brincar');await page.locator('.frase-falar').first().waitFor();
   await page.screenshot({path:path.join(process.env.SCREENSHOT_DIR,'brincar-mobile.png'),fullPage:true});
   await page.emulateMedia({colorScheme:'dark',reducedMotion:'reduce'});
   await page.screenshot({path:path.join(process.env.SCREENSHOT_DIR,'brincar-dark.png'),fullPage:true});
  }
  await page.goto(base+'/inicial');
  await page.getByRole('button',{name:'Sair',exact:true}).click();
  await page.waitForURL('**/home');
  await page.goto(base+'/perfil');await page.waitForURL('**/home');
  assert.deepEqual(runtimeErrors,[]);
  console.log('PASS: unauthenticated profile guard, mock login, 18 category/viewport combinations, images, voice, keyboard, persistent favorites, removal, logout.');
 } finally {await browser.close();if(server) await new Promise(resolve=>server.close(resolve));}
})().catch(e=>{console.error(e);process.exitCode=1;});
