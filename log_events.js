// attach to remote node
// attach to remote node
Web3 = require("web3")
web3 = new Web3("ws://localhost:8546")

subscription = web3.eth.subscribe("logs", (error, result) => {
  console.log("subscribed")
  if (!error) {
    console.log(result)
  } else {
    console.log(error)
  }
}).on("data", (logLine) => {
  console.log(logLine)
}).on("changed", (logLine) => {
  console.log(logLine)
}).on("error", (error) => {
  console.log(logLine)
})
