const WalletScanner = require('wallet-tx-scanner')

const address = '0xd385bdf7709a642223ab8ee93884866689230966'
const network = 'ethereum'

const main = async () => {
    const response = await WalletScanner.getTransactions(address, network)
    console.log(response)
}

main()