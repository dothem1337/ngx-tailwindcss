const chokidar = require('chokidar')
const build = require('./build')
const fs = require('fs')
const path = require('path')

module.exports = () => {
    const ngTwFile = path.resolve(process.cwd(), 'ng-tailwind.js')
    if (fs.existsSync(ngTwFile)) {
        const config = require(ngTwFile)

        const tailwindCSS = chokidar.watch(config.sourceCSS)

        tailwindCSS.on('change', (event, path) => {
            console.log('Reprocessing Tailwind Files')
            build()
        });

        const tailwindJS = chokidar.watch(config.configJS)

        tailwindJS.on('change', (event, path) => {
            console.log('Reprocessing Tailwind Files')
            build()
        });
    } else {
        console.error('No ng-tailwind.js file exists.\nPlease run `ngx-tailwindcss configure` in your project\'s root directory.\nRun `ngx-tailwindcss --help` for assistance,\nor view the Readme at https://github.com/tehpsalmist/ngx-tailwindcss')
    }
}
