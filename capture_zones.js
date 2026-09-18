const { spawn } = require('child_process');
const fs = require('fs');

async function main() {
  const port = 9360;
  const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
    '--headless',
    `--remote-debugging-port=${port}`,
    '--disable-gpu',
    '--window-size=1600,900',
    'http://localhost:8000/convoy.html'
  ]);

  try {
    await new Promise(r => setTimeout(r, 1800));
    const listRes = await fetch(`http://localhost:${port}/json/list`);
    const tabs = await listRes.json();
    const tab = tabs.find(t => t.url.includes('convoy.html'));
    const ws = new WebSocket(tab.webSocketDebuggerUrl);

    let msgId = 1;
    function send(method, params = {}) {
      const id = msgId++;
      return new Promise((resolve) => {
        const handler = (event) => {
          const res = JSON.parse(event.data);
          if (res.id === id) {
            ws.removeEventListener('message', handler);
            resolve(res.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await new Promise(resolve => { ws.onopen = resolve; });
    await send('Runtime.enable');

    await new Promise(r => setTimeout(r, 1200));
    await send('Runtime.evaluate', {
      expression: `document.getElementById('prompt-orbit-btn').click()`
    });
    await new Promise(r => setTimeout(r, 600));
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('e:/convoy/prompt_orbit_screenshot.png', Buffer.from(shot.data, 'base64'));
    console.log('Captured prompt_orbit_screenshot.png');

    ws.close();
    chrome.kill();
    process.exit(0);
  } catch (err) {
    console.error('Error in capture:', err);
    chrome.kill();
    process.exit(1);
  }
}

main();
