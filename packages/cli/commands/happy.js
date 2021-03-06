module.exports = ({ injectCommand, operateHooks }) => {
  const { hooksMap, createHook } = operateHooks
  createHook('happyStartHook')
  injectCommand(function({ program, cliConfig }) {
    program
      .command('happy')
      .description('情人节祝福')
      .action(async () => {
        const { name, hobby } = cliConfig
        await hooksMap.happyStartHook.promise()

        console.log(`喜欢${hobby}的${name}, 祝你情人节快乐~`)
      })
  })
}