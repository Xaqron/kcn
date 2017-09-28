const classes = require('./lib/kcn')

let client = new classes.KCN('ws://localhost:8888/kurento')

async function ping () {
  let response = await client.ping()
  console.log(response)
}

async function sampleWiring () {
  let pipeline = await client.createPipeline() // backbone
  let webRTCEndpoint = await client.createWebRTCEndpoint(pipeline) // add user
  // ...
  let res = await client.releaseElement(pipeline) // release resources
  return res
}

let x = ping()
console.log(x)
if (sampleWiring()) {
  console.log('Wiring done!')
}
