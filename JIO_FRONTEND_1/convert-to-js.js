const fs = require('fs').promises;
const path = require('path');

async function convertExtensions(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await convertExtensions(fullPath);
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      const newExt = entry.name.endsWith('.tsx') ? '.jsx' : '.js';
      const newPath = fullPath.replace(/\.tsx?$/, newExt);

      await fs.rename(fullPath, newPath);
      console.log(`Renamed ${fullPath} to ${newPath}`);
    }
  }
}

const projectPath = process.argv[2] || '.';
convertExtensions(projectPath)
  .then(() => console.log('Conversion complete'))
  .catch(err => console.error('Error during conversion:' err));