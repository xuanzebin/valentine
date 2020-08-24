const fs = require('fs')
const path = require('path')
const program = require('commander')

const packageConfig = require('../package.json')

let status = 'pending'
let cliConfig = { name: '小屁', hobby: '减肥' }
const commandNames = ['-V', '--version', '-h', '--help']

program
  .usage('<command> [options]')
  .version(packageConfig.version)

// 为每个命令的注入函数提供所需的参数，如program等对象
module.exports.injectCommand = (cmd) => {
  if (status === 'done') return console.error('注册命令行时机已经是 done，请提前注册～')
  if (typeof cmd !== 'function') return console.error(cmd, '必须是一个函数')
  cmd({ program, cliConfig })
}

// 注册完所有命令后，检测当前命令是否存在，并更改脚手架状态
module.exports.commandComplete = function() {
  commandValidate()
  parseArgv()
  status = 'done'
}

function parseArgv() {
  program.parse(process.argv)
  program.commands.forEach(c => c.on('--help', () => console.log()))
}

function commandValidate() {
  program.commands.map(command => commandNames.push(command._name))

  const commandName = process.argv[2]

  if (commandName && !commandNames.includes(commandName)) {
    console.log(chalk.red(`  没有找到 ${process.argv[2]} 命令 \n`))
    program.help()
  }

  if (!process.argv[2]) {
    program.help()
  }
}

// 获取所有命令行命令，包括预设的以及插件的
module.exports.getAllCommands = () => {
  const cwdFns = []
  const localCwdPath = path.join(__dirname, '..', 'commands')
  const localCwdNames = [...fs.readdirSync(localCwdPath)]

  localCwdNames.forEach(name => {
    const cwdPath = path.join(localCwdPath, name)
    cwdFns.push(require(cwdPath))
  })

  const { getAllPluginIdOfPackageJson } = require('./share-utils')

  getAllPluginIdOfPackageJson().forEach(name => {
    const command = path.join(process.cwd(), 'node_modules', name, 'command.config.js')
    try {
      const cwd = require(command)
      cwdFns.push(cwd)
    } catch (error) {
      console.log(`${command} 不存在`)
    }
  })

  return cwdFns
}