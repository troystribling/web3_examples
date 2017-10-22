// attach to remote node
// attach to remote node
Web3 = require("web3")
web3 = new Web3("ws://localhost:8546")

subscription = web3.eth.subscribe("syncing", (error, result) => {
  if (!error) {
    console.log(result)
  } else {
    console.log(error)
  }
}).on("data", (syncStatus) => {
  console.log(syncStatus)
}).on("changed", (syncStatus) => {
  console.log(syncStatus)
}).on("error", (error) => {
  console.log(error)
})
