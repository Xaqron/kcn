# KCN #

[Kurento](https://www.kurento.org) client [node.js](https://nodejs.org) module, based on [suldashi](https://github.com/suldashi/kcl) typescript libray.

---
## Usage
```js
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

ping()
sampleWiring()
```

Sample ping response from [Kurento media server](https://github.com/Kurento/kurento-media-server):
```js
{id: "915db4f6-a751-4edf-b81a-6dd54a36e8ed", jsonrpc: "2.0", result: Object}
```

## TODO

- [x] Porting code to JavaScript.
- [ ] Support for missing features i.e. recorder, filters...
- [ ] Refactoring to minimize dependencies on external libraries.

---

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://standardjs.com)