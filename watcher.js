const { watchFile: watch } = require('fs');
const { exec } = require('child_process');

console.log('Watcher initialized.')

watch('index.pug', (current, old) => {
    console.log(`index.pug (${old.size} → ${current.size} bytes) modified on ${current.mtime}`);
    exec('pug index.pug')
})