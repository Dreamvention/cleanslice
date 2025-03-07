import * as fs from 'fs';
import * as path from 'path';

export const registerSlices = (): string[] => {
  const settings = {
    specialSlices: [
      './slices/setup',
      './slices/theme',
      './slices/common',
      './slices/auth',
      './slices/teams',
      './slices/api',
    ],
  };

  const slices = fs.readdirSync('./slices').filter((entry) => {
    const fullPath = path.join('./slices', entry);
    return fs.statSync(fullPath).isDirectory();
  });

  if (!slices.length) return [];

  const result: string[] = [...settings.specialSlices];

  const collectSlices = (path: string, exclusions: string[] = []) => {
    if (fs.existsSync(`${path}/nuxt.config.ts`)) {
      if (!exclusions.includes(path)) {
        result.push(path);
      }
    } else {
      const subPaths = fs.readdirSync(path).filter((entry) => {
        const fullPath = `${path}/${entry}`;
        return fs.statSync(fullPath).isDirectory();
      });

      for (const subPath of subPaths) {
        collectSlices(`${path}/${subPath}`, exclusions);
      }
    }
  };

  for (const slice of slices) {
    const slicePath = `./slices/${slice}`;
    if (settings.specialSlices.some((special) => special.includes(slice))) continue;

    collectSlices(slicePath, settings.specialSlices);
  }

  return result;
};
