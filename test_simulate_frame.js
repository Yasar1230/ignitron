const fs = require('fs');

// Mock browser globals
global.window = global;
global.document = {
    hidden: false,
    addEventListener: () => {},
    getElementById: (id) => {
        return {
            id,
            style: {},
            classList: { add: () => {}, remove: () => {}, toggle: () => {} },
            setAttribute: () => {},
            addEventListener: () => {},
            appendChild: () => {},
            replaceChildren: () => {},
            querySelectorAll: () => [],
            querySelector: () => null,
            getBoundingClientRect: () => ({ width: 320, height: 160 }),
            getContext: () => ({
                setTransform: () => {},
                clearRect: () => {},
                beginPath: () => {},
                arc: () => {},
                fill: () => {},
                stroke: () => {},
                fillRect: () => {},
                fillText: () => {},
                moveTo: () => {},
                lineTo: () => {},
                closePath: () => {},
                save: () => {},
                restore: () => {},
                translate: () => {},
                rotate: () => {}
            })
        };
    },
    createElement: (tag) => ({
        tag,
        style: {},
        classList: { add: () => {}, remove: () => {}, toggle: () => {} },
        setAttribute: () => {},
        appendChild: () => {},
        append: () => {},
        dataset: {}
    }),
    createElementNS: (ns, tag) => ({
        ns, tag,
        style: {},
        classList: { add: () => {}, remove: () => {}, toggle: () => {} },
        setAttribute: () => {},
        appendChild: () => {},
        dataset: {}
    }),
    querySelectorAll: () => [],
    querySelector: () => null,
    documentElement: { scrollHeight: 5000 }
};
global.innerWidth = 1920;
global.innerHeight = 1080;
global.scrollY = 0;
global.scrollTo = () => {};
global.addEventListener = () => {};
global.matchMedia = () => ({ matches: false });
global.requestAnimationFrame = (cb) => { global._raf = cb; };
global.performance = { now: () => Date.now() };

// We need THREE.js!
// Let's see if THREE is imported via cdn or if we can mock or load three
console.log('Testing script loading...');
const html = fs.readFileSync('index.html', 'utf8');
const scriptMatch = html.split('<script>')[1].split('</script>')[0];

console.log('Script length:', scriptMatch.length);
