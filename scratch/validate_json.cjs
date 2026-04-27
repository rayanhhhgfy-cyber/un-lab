const fs = require('fs');
const paths = [
  'c:/Users/Lenovo/Downloads/un-lab-main/un-lab-main/un-lab-main/src/i18n/locales/en.json',
  'c:/Users/Lenovo/Downloads/un-lab-main/un-lab-main/un-lab-main/src/i18n/locales/ar.json'
];

paths.forEach(path => {
  try {
    const content = fs.readFileSync(path, 'utf8');
    JSON.parse(content);
    console.log(`${path}: VALID`);
  } catch (e) {
    console.error(`${path}: INVALID`);
    console.error(e.message);
    
    // Find the error line
    const match = e.message.match(/at position (\d+)/);
    if (match) {
      const pos = parseInt(match[1]);
      const content = fs.readFileSync(path, 'utf8');
      const lines = content.slice(0, pos).split('\n');
      console.error(`Error around line ${lines.length}`);
      console.error(`Context: ${content.slice(Math.max(0, pos - 50), pos + 50)}`);
    }
  }
});
