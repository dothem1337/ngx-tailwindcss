const fs = require('fs')
const path = require('path')

module.exports = (userDefConfig, defaultOverride) => {
  const ngTwFile = path.resolve(process.cwd(), 'ng-tailwind.js')
  const defaultConfig = {
    configJS: `${path.resolve('./tailwind.js')}`,
    sourceCSS: `${path.resolve('./src/tailwind.css')}`,
    watch: `${path.resolve('./styles/**.scss')}`,
      tempCSS: `${path.resolve('./.tmp/temp.css')}`,
      outputCSS: `${path.resolve('./src/styles.css')}`
  }
  let newConfig
  let currentConfig

  if (defaultOverride) {
    newConfig = {
      ...defaultConfig,
      ...userDefConfig
    }
    fs.writeFile(
      ngTwFile,
      `module.exports = {
  configJS: '${newConfig.configJS}',
  sourceCSS: '${newConfig.sourceCSS}',
  watch: '${newConfig.watch}',
  tempCSS: '${newConfig.tempCSS}',
  outputCSS: '${newConfig.outputCSS}'
}`,
      err => {
        if (err) console.error('Error updating ng-tailwind.js:', err)
      }
    )
  } else if (fs.existsSync(ngTwFile)) {
    currentConfig = require(ngTwFile)
    newConfig = {
      ...currentConfig,
      ...userDefConfig
    }
    fs.writeFile(
      ngTwFile,
      `module.exports = {
  configJS: '${newConfig.configJS}',
  sourceCSS: '${newConfig.sourceCSS}',
  watch: '${newConfig.watch}',
  tempCSS: '${newConfig.tempCSS}',
  outputCSS: '${newConfig.outputCSS}'
}`,
      err => {
        if (err) console.error('Error updating ng-tailwind.js:', err)
      }
    )
  } else {
    newConfig = {
      ...defaultConfig,
      ...userDefConfig
    }
    fs.writeFile(
      ngTwFile,
      `module.exports = {
  configJS: '${newConfig.configJS}',
  sourceCSS: '${newConfig.sourceCSS}',
  watch: '${newConfig.watch}',
  tempCSS: '${newConfig.tempCSS}',
  outputCSS: '${newConfig.outputCSS}'
}`,
      err => {
        if (err) console.error('Error creating ng-tailwind.js:', err)
      }
    )
  }
}
