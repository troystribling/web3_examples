// connect to remote blockchain
Web3 = require("web3")
web3 = new Web3("ws://localhost:8546")

function printSync(sync) {
  return `(Synchronizing) startingBlock: ${sync.startingBlock}, currentBlock: ${sync.currentBlock},\
  highestBlock: ${sync.highestBlock}, knownStates: ${sync.knownStates}, pulledStates: ${sync.pulledStates}`
}

function printBlock(block) {
  return `(Block) number: ${block.number}, hash: ${block.hash}, parentHash: ${block.parentHash}, nonce: ${block.nonce},\
  sha3Uncles: ${block.sha3Uncles}, logsBloom: ${block.logsBloom}, transactionsRoot: ${block.transactionsRoot},\
  stateRoot: ${block.stateRoot}, miner: ${block.miner}, difficulty: ${block.difficulty}, totalDifficulty: ${block.totalDifficulty},\
  size: ${block.size}, extraData: ${block.extraData}, gasLimit: ${block.gasLimit}, gasUsed: ${block.gasUsed},\
  timestamp: ${block.timestamp}, transactions: [${block.transactions}], uncles: [${block.uncles}]`
}

function printTransaction(transaction) {
  return `(Transaction) hash: ${transaction.hash}, nonce: ${transaction.nonce}, blockHash: ${transaction.blockHash},\
  blockNumber: ${transaction.blockNumber}, transactionIndex: ${transaction.transactionIndex}, from: ${transaction.from}\
  to: ${transaction.to}, value: ${transaction.value}, gasPrice: ${transaction.gasPrice}, gas: ${transaction.gas}, input: ${transaction.input}`
}

function printTransactionReceipt(receipt) {
  return `(TransactionReceipt): ${receipt.blockHash}, blockNumber: ${receipt.blockNumber}, transactionHash: ${receipt.transactionHash}\
  transactionIndex: ${receipt.transactionIndex}, from: ${receipt.from}, to: ${receipt.to}, contractAddress: ${receipt.contractAddress},\
  cumulativeGasUsed: ${receipt.cumulativeGasUsed}, gasUsed: ${receipt.gasUsed}, logs: ${printLogs(receipt.logs)}`
}

function printLogs(logs) {
  results = []
  for (var log in logs) {
    result = `(Log) address: ${log.address}, data: ${log.data}, topics: ${log.topics}, logIndex: ${log.logIndex},\
  transactionIndex: ${log.transactionIndex}, transactionHash: ${log.transactionHash}, blockHash: ${log.blockHash}, blockNumber: ${log.blockNumber}`
  }
  return results
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
  //  get latest block
  return web3.eth.getBlockTransactionCount('latest')
}).then((transactionCount) => {
  console.log(`Latest Block Transaction Count: ${transactionCount}`)
  return web3.eth.getBlock('latest')
}).then((block) => {
  console.log(printBlock(block))
  // get the transaction count for thr latest block
  transationHash = block.transactions[0]
  return web3.eth.getTransaction(transationHash)
}).then((transaction) => {
  console.log(printTransaction(transaction))
  return web3.eth.getTransactionReceipt(transaction.hash)
}).then((receipt) => {
  console.log(printTransactionReceipt(receipt))
}).catch((error) => {
  console.log(error)
}).then(() => {
  // exeit node when complete
  process.exit(1)
})
