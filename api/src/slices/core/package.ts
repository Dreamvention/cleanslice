import { prepareUploadFolder } from './utils';
import * as path from 'path';
import * as archiver from 'archiver';
import * as fs from 'fs';

const root = path.resolve(__dirname, '../../../');

const uploadDir = prepareUploadFolder(root);

const output = fs.createWriteStream('api.zip');
const archive = archiver('zip');

output.on('close', function () {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', function (err) {
  throw err;
});

archive.pipe(output);

// append files from a sub-directory, putting its contents at the root of archive
archive.directory(uploadDir, false);

// append files from a sub-directory and naming it `new-subdir` within the archive
// archive.directory('subdir/', 'new-subdir');

archive.finalize();
