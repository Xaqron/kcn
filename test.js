const classes = require('./lib/kcn')

let client = new classes.KCN('ws://localhost:8888/kurento')

client.heartBeat((err, res) => {
  console.log(res === 'ok' ? `kms ❤️ ${client.upTime / 1000} sec` : `kms 💔 after ${client.upTime / 1000}`)
})

// async function ping () {
//   let response = await client.ping()
//   console.log(response)
// }

// ping().then(() => { console.log('ping done!') })

async function sampleWiring () {
  let pipeline = await client.createPipeline() // backbone
  console.log(pipeline)
  let webRTCEndpoint = await client.createWebRTCEndpoint(pipeline) // add user
  console.log(webRTCEndpoint)
  // add ice candidate of user to WebRTCEndpoint
  let res = await client.releaseElement(pipeline) // release resources
  pipeline.dispose()
  return res
}

sampleWiring().then(() => {
  console.log('Wiring done!')
})
