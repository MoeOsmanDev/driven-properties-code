import fs from 'fs';
import path from 'path';

// Project structure definition
const structure: Record<string, string[]> = {
  app: ['layout.tsx', 'page.tsx', 'globals.css'],
  components: ['Header.tsx', 'Footer.tsx'],
  'components/ui': ['Button.tsx', 'Input.tsx'],
  lib: ['utils.ts', 'api.ts'],
  public: ['favicon.ico', 'vercel.svg'],
  styles: ['globals.css'],
};

// List of folders/files to ignore
const ignoreList = ['.git', '.gitignore', 'node_modules'];

// Helper function to create folders and files
const createStructure = (basePath: string) => {
  Object.entries(structure).forEach(([folder, files]) => {
    const folderPath = path.join(basePath, folder);

    // Skip ignored folders
    if (ignoreList.some(ignore => folder.includes(ignore))) return;

    fs.mkdirSync(folderPath, { recursive: true });

    files.forEach(file => {
      const filePath = path.join(folderPath, file);
      fs.writeFileSync(filePath, '', { flag: 'wx' }); // Empty file
    });
  });
};

// Run the generator
const projectRoot = process.cwd();
createStructure(projectRoot);

console.log(
  '✅ Project structure generated successfully (without ignored files).'
);
