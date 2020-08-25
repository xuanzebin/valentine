module.exports = ({ injectCommand, operateHooks }) => {
  operateHooks.tapHook('happyStartHook', 'love', async () => {
    logLove()
  })
  injectCommand(function({ program }) {
    program
      .command('love')
      .description('情人节表白')
      .action(() => {
        logLove()
      })
  })
}

function logLove () {
  console.log(`
   ____   __    ____ _    ________   __  ______  __  __
   /  _/  / /   / __ \\ |  / / ____/   \\ \\/ / __ \\/ / / /
   / /   / /   / / / / | / / __/       \\  / / / / / / / 
 _/ /   / /___/ /_/ /| |/ / /___       / / /_/ / /_/ /  
/___/  /_____/\\____/ |___/_____/      /_/\\____/\\____/   
                                                       
  `)
}