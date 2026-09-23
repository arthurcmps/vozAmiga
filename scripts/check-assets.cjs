const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const files = dir => fs.readdirSync(dir, {withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]);
const missing=[];
for(const file of files(path.join(root,'src/app')).filter(f=>/\.(ts|html)$/.test(f)&&!f.endsWith('.spec.ts'))){
 for(const asset of fs.readFileSync(file,'utf8').matchAll(/assets\/[\w/.-]+/g)){
  if(!fs.existsSync(path.join(root,'src',asset[0])))missing.push(`${path.relative(root,file)}: ${asset[0]}`);
 }
}
if(missing.length){console.error(missing.join('\n'));process.exitCode=1;}
else console.log('Todas as referências estáticas a assets existem.');
