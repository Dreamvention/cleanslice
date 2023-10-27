import * as fs from "fs";
export const registerSlices = (): string[] => {
  const slices = fs.readdirSync("./slices");
  if (!slices.length) return [];
  return slices
    ?.filter((slice) => fs.existsSync(`./slices/${slice}`))
    .map((slice) => `./slices/${slice}`);
};
