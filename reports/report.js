const reporter = require("k6-html-reporter");
const fs = require("fs");

const REPORT_FOLDER = './reports'
const SOURCE_FOLDER = './reports/source'

fs.readdirSync(SOURCE_FOLDER).forEach(file => {
  const name = file.replace('.json', '')
  let opt = {
    jsonFile: `${SOURCE_FOLDER}/${file}`,
    output: REPORT_FOLDER,
  }

  reporter.generateSummaryReport(opt);
  fs.renameSync(`${REPORT_FOLDER}/report.html`, `${REPORT_FOLDER}/${name}.html`);
});
