var fs = require('fs');
var path = require('path');

function runPrebuild() {
    var slices = fs.readdirSync('../slices');
    slices = slices?.filter(slice => slice !== 'core' && fs.existsSync(`../slices/${slice}/api/index.ts`));

    var content = fs.readFileSync('../slices/core/nest/registerSlices.template.ts').toString();
    let importSlices = '';
    let pushSlices = '';
    if (slices) {
      for (const slice of slices) {
        const className = `${slice.charAt(0).toUpperCase() + slice.slice(1)}Slices`;
        importSlices += `import {${className}} from '../slices/${slice}/api';\n`;
        pushSlices += `result.push(...${className});\n`;
      }
    }
    content = content.replace('<% importSlices %>', importSlices);
    content = content.replace('<% pushSlices %>', pushSlices);
    fs.writeFileSync('./registerSlices.ts', content);
}
runPrebuild();
