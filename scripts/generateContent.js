const fs = require('fs');
const path = require('path');

// Allowed file extensions for code/content files only
const allowedExtensions = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.json',
  '.css',
  '.mjs',
  '.cjs',
  '.md',
  '.html',
  '.d.ts',
  '.json',
  '.mjs',
  '.cjs',
  '.mjs',
  '.mjs',
  '.mjs',
]);

// Ignore these folders completely
const ignoreFolders = new Set(['node_modules', '.next', 'public', '.git']);

// Ignore these files explicitly (non-code files in root)
const ignoreFiles = new Set([
  'package-lock.json',
  'package.json',
  'README.md',
  'tailwind.config.js',
  'postcss.config.mjs',
  'eslint.config.mjs',
  'next-env.d.ts',
  'tsconfig.json',
  'tsconfig.scripts.json',
  'structureGeneration.ts',
]);

function gatherFiles(dir, baseDir = dir) {
  if (ignoreFolders.has(path.basename(dir))) return [];

  let files = [];
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(entry => !ignoreFiles.has(entry.name));

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files = files.concat(gatherFiles(fullPath, baseDir));
    } else if (entry.isFile()) {
      // Check extension + also exclude root-level ignored files
      if (allowedExtensions.has(path.extname(entry.name))) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

const rootDir = process.cwd();
const outputFile = path.join(rootDir, 'project-content.txt');

const files = gatherFiles(rootDir);

const writeStream = fs.createWriteStream(outputFile, { encoding: 'utf-8' });

for (const filePath of files) {
  const relPath = path.relative(rootDir, filePath);
  const content = fs.readFileSync(filePath, 'utf-8');

  writeStream.write(`----- FILE: ${relPath} -----\n\n`);
  writeStream.write(content);
  writeStream.write(`\n\n\n`);
}

writeStream.end(() => {
  console.log(`✅ All code file contents written to ${outputFile}`);
});
