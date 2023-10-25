import * as fs  from "fs";
export const registerSlices = (): string[] => {

  const slices = fs.readdirSync('../slices');
  if (!slices.length) return [];

  return slices?.filter(slice => slice !== 'core' && fs.existsSync(`../slices/${slice}/app`)).map((slice) => `../slices/${slice}/app`);
};
