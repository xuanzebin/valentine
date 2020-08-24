module.exports = injectCommand => {
  injectCommand(function({ program }) {
    program
      .command('love')
      .description('情人节表白')
      .action(() => {
        console.log(`
        ____   __    ____ _    ________   __  ______  __  __
        /  _/  / /   / __ \\ |  / / ____/   \\ \\/ / __ \\/ / / /
        / /   / /   / / / / | / / __/       \\  / / / / / / / 
      _/ /   / /___/ /_/ /| |/ / /___       / / /_/ / /_/ /  
     /___/  /_____/\\____/ |___/_____/      /_/\\____/\\____/   
                                                             
        `)
      })
  })
}