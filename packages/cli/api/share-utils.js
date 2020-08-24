const fs = require('fs')
const path = require('path')

const pkPluginRE = /^(@o2team\/)valentine-plugin-/

exports.pkPluginRE = pkPluginRE

exports.getAllPluginIdOfPackageJson = () => {
  const pkgJsonPath = path.join(process.cwd(), 'package.json')
  const deps = {}
  const plugins = []

  if (fs.existsSync(pkgJsonPath)) {
    const pkg = require(pkgJsonPath)

    Object.assign(deps, pkg.devDependencies || {}, pkg.dependencies || {})
    Object.keys(deps).forEach(dep => {
      pkPluginRE.test(dep) && plugins.push(dep)
    })
  }

  return plugins
}