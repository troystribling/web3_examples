
// attach to remote node
Web3 = require("web3")
web3 = new Web3("ws://localhost:8546")

subscription = web3.eth.subscribe("newBlockHeaders", (error, result) => {
  if (!error) {
    console.log(result)
  } else {
    console.log(error)
  }
}).on("data", (blockHeader) => {
  console.log(blockHeader)
}).on("changed", (blockHeader) => {
  console.log(blockHeader)
}).on("error", (error) => {
  console.log(error)
})
