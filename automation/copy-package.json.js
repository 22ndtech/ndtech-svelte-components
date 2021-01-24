const fs = require('fs');

// copy package.json to the public folder
fs.copyFile('package.json', 'public\\package.json', (err) => {
  if (err) throw err;
  console.log('source.txt was copied to destination.txt');
});