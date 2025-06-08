import * as fs from 'fs';
import * as path from 'path';

export const registerSlices = (): string[] => {
  const settings = {
    specialSlices: ['./slices/setup', './slices/user', './slices/common'],
  };

  const slices = fs.readdirSync('./slices').filter((entry) => {
    const fullPath = path.join('./slices', entry);
    return fs.statSync(fullPath).isDirectory();
  });

  if (!slices.length) return [];

  const result: string[] = [];

  const collectSlices = (path: string) => {
    if (fs.existsSync(`${path}/nuxt.config.ts`)) {
      if (!result.includes(path)) {
        result.push(path);
      }
    } else {
      const subPaths = fs.readdirSync(path).filter((entry) => {
        const fullPath = `${path}/${entry}`;
        return fs.statSync(fullPath).isDirectory();
      });

      for (const subPath of subPaths) {
        collectSlices(`${path}/${subPath}`);
      }
    }
  };

  // Process special slices first
  for (const specialSlice of settings.specialSlices) {
    collectSlices(specialSlice);
  }

  // Process remaining slices
  for (const slice of slices) {
    const slicePath = `./slices/${slice}`;
    collectSlices(slicePath);
  }

  return result;
};
