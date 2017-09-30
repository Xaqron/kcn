const classes = require('./lib/kcn')

let client = new classes.KCN('ws://localhost/kurento')

client.heartBeat((err, res) => {
  console.log(res === 'ok' ? `kms ❤️ ${client.upTime / 1000} sec` : `kms 💔 after ${client.upTime / 1000}`)
})

// disableHeartBeat ()
