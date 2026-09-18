const fs = require('fs');

// We can extract the JS code from index.html and test it with mock objects
const html = fs.readFileSync('index.html', 'utf8');
const scriptMatch = html.split('<script>')[1].split('</script>')[0];

console.log('Script extracted, testing for runtime crash scenarios...');

// Let's search for any unprotected property access on tourNodes[tourIndex]
const lines = scriptMatch.split('\n');
lines.forEach((l, i) => {
    if (l.includes('tourNodes[tourIndex]') && !l.includes('tourNodes[tourIndex]?.')) {
        console.log(`Line ${i + 1} uses tourNodes[tourIndex] without optional chaining:`, l.trim());
    }
});
