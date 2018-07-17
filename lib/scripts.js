const fs = require('fs')
const path = require('path')

module.exports = () => {
  fs.readFile(path.resolve(process.cwd(), 'package.json'), (err, data) => {
    if (err) {
      throw err
    } else {
      const packageJSON = JSON.parse(data)
      if (!packageJSON.scripts) packageJSON.scripts = {}
      if (!packageJSON.scripts.prestart) {
        packageJSON.scripts.prestart = 'ngx-tailwindcss build'
      } else {
        packageJSON.scripts.prestart = 'ngx-tailwindcss build && ' + packageJSON.scripts.prestart
      }
      if (!packageJSON.scripts.start) {
        packageJSON.scripts.start = 'ng serve & ngx-tailwindcss watch'
      } else {
        packageJSON.scripts.start += ' & ngx-tailwindcss watch'
      }
      if (!packageJSON.scripts.build) {
        packageJSON.scripts.build = 'ngx-tailwindcss build && ng build'
      } else {
        packageJSON.scripts.build = 'ngx-tailwindcss build && ' + packageJSON.scripts.build
      }
      fs.writeFile(path.resolve(process.cwd(), 'package.json'), JSON.stringify(packageJSON, null, 2), err => {
        if (err) throw err
        else console.log('Successfully Updated Scripts!')
      })
    }
  })
}
