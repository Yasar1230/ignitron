const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const pStart = html.indexOf('const plantGraph =');
const pEnd = html.indexOf('window.CONVOY =');
let code = html.substring(pStart, pEnd);
code = code.replace('const plantGraph =', 'global.plantGraph =').replace('const fleet =', 'global.fleet =');
eval(code);

console.log('Edges in plantGraph:', plantGraph.edges.length);
const nodes = new Map(plantGraph.nodes.map(n => [n.id, n]));
const edges = new Map(plantGraph.edges.map(e => [e.id, e]));

for (const e of plantGraph.edges) {
    if (!nodes.has(e.from)) console.error('Missing from node:', e.from, 'in edge', e.id);
    if (!nodes.has(e.to)) console.error('Missing to node:', e.to, 'in edge', e.id);
}
console.log('All nodes exist.');

console.log('\nFleet check:');
for (const f of fleet) {
    console.log(f.id, f.type, f.route, f.status);
    if (f.route && !edges.has(f.route)) console.error('Unknown route:', f.route, 'in', f.id);
}
