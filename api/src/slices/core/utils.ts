import * as fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';

// Function to prepare the .upload folder
export function prepareUploadFolder(folderPath: string) {
  const uploadDir = path.resolve(folderPath, '.upload');
  const rootDir = path.resolve(folderPath); // Adjust this path as necessary

  // Delete .upload folder if it exists
  fs.removeSync(uploadDir);

  // Create .upload folder
  fs.ensureDirSync(uploadDir);

  // Define patterns for files to copy and to exclude
  const includePattern = '**/*';
  const excludePatterns = [
    'docker/**/*',
    '.upload/**/*',
    'api.zip',
    '.gen/**/*',
    'node_modules/.prisma/client/query_engine-windows*',
    '**node_modules/.prisma/client/libquery_engine-darwin*',
    'node_modules/.prisma/client/libquery_engine-darwin*',
    'node_modules/prisma/libquery_engine-darwin*',
    '**node_modules/.prisma/client/libquery_engine-debian*',
    'node_modules/.prisma/client/libquery_engine-debian*',
    'node_modules/@prisma/engines/query_engine-windows*',
    'node_modules/@prisma/engines/node_modules/.cache/**/*',
    'node_modules/@prisma/engines/libquery_engine-*',
    'node_modules/@prisma/engines/schema-engine-*',
    'node_modules/prisma/**/*',
    'node_modules/typescript/**/*',
    'node_modules/prettier/**/*',
    'node_modules/.cache/**/*',
    'node_modules/@cdktf/**/*',
    'node_modules/cdktf-cli/**/*',
    'node_modules/cdktf/**/*',
    'node_modules/react-devtools-core/**/*',
    'node_modules/@nestjs/cli/**/*',
    'node_modules/@nodeteam/nestjs-prisma-pagination/node_modules/typescript/**/*',
    'node_modules/jsii-pacmak/node_modules/typescript/**/*',
    'node_modules/jsii-pacmak/node_modules/.bin/**/*',
    'node_modules/jsii-rosetta/node_modules/typescript/**/*',
    'node_modules/jsii-rosetta/node_modules/.bin/**/*',
    'node_modules/jsii-srcmak/node_modules/typescript/**/*',
    'node_modules/jsii-srcmak/node_modules/.bin/**/*',
    'node_modules/jsii-reflect/node_modules/typescript/**/*',
    'node_modules/jsii-reflect/node_modules/.bin/**/*',
    'node_modules/jsii/node_modules/typescript/**/*',
    'node_modules/jsii/node_modules/.bin/**/*',
    'node_modules/langchain/node_modules/**/*',
    'node_modules/@aws-sdk/**/*',
    'docker/**/*',
    'node_modules/.bin/**/*',
    'node_modules/**/*/node_modules/@types/**/*',
    'node_modules/downlevel-dts/**/*',
    'cdktf.out/**/*',
    'terraform*',
    '.terraform*',
    '.env',
    '.env.dev',
    '.env.prod',
    'node_modules/@typescript-eslint/**/*',
  ];
  // Use glob to find all files except those excluded
  glob.sync(includePattern, { cwd: rootDir, ignore: excludePatterns, dot: true, nodir: true }).forEach((file) => {
    const srcPath = path.join(rootDir, file);
    const destPath = path.join(uploadDir, file);
    try {
      fs.copySync(srcPath, destPath);
    } catch (error) {
      console.error(`Error copying ${srcPath} to ${destPath}:`, error);
    }
  });
  return uploadDir;
}
