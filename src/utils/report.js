const reporter = require('k6-html-reporter')
const fs = require('fs')

const REPORT_FOLDER = './dist/reports'
const SOURCE_FOLDER = './dist/source'

fs.readdirSync(SOURCE_FOLDER).forEach((file) => {
  const name = file.replace('.json', '')
  const options = {
    jsonFile: `${SOURCE_FOLDER}/${file}`,
    output: REPORT_FOLDER,
  }

  reporter.generateSummaryReport(options)

  fs.renameSync(`${REPORT_FOLDER}/report.html`, `${REPORT_FOLDER}/${name}.html`)
})
