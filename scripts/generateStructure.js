const fs = require('fs');
const path = require('path');

const ignoreFolders = new Set(['node_modules', '.git', '.next']);
const ignoreFiles = new Set(['.gitignore']);

function generateTree(dir, prefix = '') {
  if (ignoreFolders.has(path.basename(dir))) return '';

  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(entry => !ignoreFiles.has(entry.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  let tree = '';
  entries.forEach((entry, index) => {
    const isLast = index === entries.length - 1;
    const pointer = isLast ? '└── ' : '├── ';
    tree += `${prefix}${pointer}${entry.name}\n`;

    if (entry.isDirectory()) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      tree += generateTree(path.join(dir, entry.name), newPrefix);
    }
  });

  return tree;
}

const rootDir = process.cwd();
const outputFile = path.join(rootDir, 'project-structure.txt');

const treeStr = generateTree(rootDir);
fs.writeFileSync(outputFile, treeStr);

console.log(`✅ Project structure saved to ${outputFile}`);
