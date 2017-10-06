// connect to remote blockchain
Web3 = require("web3")
web3 = new Web3("ws://localhost:8546")

function printSync(sync) {
  return `(Synchronizing) startingBlock: ${sync.startingBlock}, currentBlock: ${sync.currentBlock},  \
highestBlock: ${sync.highestBlock}, knownStates: ${sync.knownStates}, pulledStates: ${sync.pulledStates}`
}

function printBlock(block) {
  return `(Block) number: ${block.number}, hash: ${block.hash}, parentHash: ${block.parentHash}, nonce: ${block.nonce}, \
sha3Uncles: ${block.sha3Uncles}, logsBloom: ${block.logsBloom}, transactionsRoot: ${block.transactionsRoot}, \
stateRoot: ${block.stateRoot}, miner: ${block.miner}, difficulty: ${block.difficulty}, totalDifficulty: ${block.totalDifficulty}, \
size: ${block.size}, extraData: ${block.extraData}, gasLimit: ${block.gasLimit}, gasUsed: ${block.gasUsed}, \
timestamp: ${block.timestamp}, transactions: [${block.transactions}], uncles: [${block.uncles}]`
}

// get accounts
web3.eth.getAccounts().then((accounts) => {
  console.log("Accounts: " + accounts)
  // get account balances
  return Promise.all(accounts.map((account) => web3.eth.getBalance(account)))
}).then((balances) => {
  console.log("Balances: " + balances)
  // get current block number
  return web3.eth.getBlockNumber()
}).then((blockNumber) => {
  console.log(`Current Block: ${blockNumber}`)
  // get current gass price
  return web3.eth.getGasPrice()
}).then((price) => {
  console.log(`Gas Price: ${price}`)
  // get hashRate
  return web3.eth.getHashrate()
}).then((hashRate) => {
  console.log(`HashRate: ${hashRate}`)
  // get minining flag
  return web3.eth.isMining()
}).then((mining) => {
  console.log(`Is Mining ${mining}`)
  // get syncing flag
  return web3.eth.isSyncing()
}).then((sync) => {
  if (sync) {
    console.log(printSync(sync))
  } else {
    console.log("Not Syncing")
  }
  // get coinbase address (address to recieve mining rewards)
  return web3.eth.getCoinbase()
}).then((address) => {
  console.log(`Coinbase: ${address}`)
  // get ethereum protocol version
  return web3.eth.getProtocolVersion()
}).then((version) => {
  console.log(`Ethereum Protocol Version: ${version}`)
  // get default account
  return web3.eth.defaultAccount
}).then((address) => {
  // defaul account is used as the default from property fo these methods web3.eth.call(), web3.eth.sendTransaction(),
  // new web3.eth.Contract() -> myContract.methods.myMethod().call(),
  // new web3.eth.Contract() -> myContract.methods.myMethod().send()
  console.log(`Default Acount: ${address}`)
  return web3.eth.defaultBlock
}).then((address) => {
  console.log(`Default Block: ${address}`)
  // get latest block
  return web3.eth.getBlock('latest')
}).then((block) => {
    console.log(printBlock(block))
}).catch((error) => {
  console.log(error)
}).then(() => {``
  // exeit node when complete
  process.exit(1)
})
