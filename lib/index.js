const axios = require('axios');

class WalletScanner {

    /**
     * The constructor function initializes an object with protected keys for different blockchain networks
     * along with their corresponding API URLs.
     */
    constructor() {
        this.protectedKeys = {
            ethereum: {
                key: '233161YMHEVQ4D6X1G5GMKP22Z1JPKXY68',
                url: 'https://api.etherscan.io/api'
            },
            tron: {
                key: 'd7533657-e7f8-4fde-bdc7-c4441b90db79',
                url: 'https://api.trongrid.io'
            },
            polygon: {
                key: 'VEMF2T8BN6D8RS2JH4CT5RNUP7PC349Z3M',
                url: 'https://api.polygonscan.com/api'
            },
            bsc: {
                key: 'B18GJMDTEUTJBVISFWCWM2CGJ92X86EU9U',
                url: 'https://api.bscscan.com/api'
            },
            optimism: {
                key: 'QPYGXVVT7VV3A81WXB6JGNIK4883PJEA7A',
                url: 'https://api-optimistic.etherscan.io/api'
            },
            arbitrum: {
                key: '5RHJP7RFI38GPZXZTK7GNR6KK3UNSSG78A',
                url: 'https://api-arbitrum.etherscan.io/api'
            },
            bitcoin: {
                url: 'https://blockchain.info/rawaddr/'
            }
        };
    }

    /**
     * The `getTransactions` function is an asynchronous function that retrieves transaction data for a
     * given address and network using an API key.
     * @param address - The address parameter is the wallet address for which you want to retrieve the
     * transactions. It is the unique identifier for a specific wallet on the blockchain network.
     * @param network - The `network` parameter is used to specify the blockchain network from which you
     * want to retrieve transactions. It could be a string representing the network name or an identifier
     * for the network.
     * @returns The function `getTransactions` returns an object with properties `success`, `message`, and
     * `data`. The `success` property indicates whether the request was successful or not. If `success` is
     * `true`, the `data` property contains the result of the transaction list. If `success` is `false`,
     * the `message` property contains an error message.
     */
    async getTransactions(address, network) {
        try {
            switch (network) {
                case 'bitcoin': 
                    const resBitcoin = await axios.get(`${this.protectedKeys[network].url}${address}`);
                    if (!resBitcoin.data.txs || resBitcoin.data.txs.length === 0) {
                        return {
                            success: false,
                            message: 'No transactions found'
                        };
                    }
                    return {
                        success: true,
                        data: resBitcoin.data.txs
                    };
                default:
                    const { key, url } = this.protectedKeys[network];
                    const response = await axios.get(url, {
                        params: {
                            module: 'account',
                            action: 'txlist',
                            address,
                            apikey: key
                        }
                    });
        
                    if (!response.data.result || response.data.result.length === 0) {
                        return {
                            success: false,
                            message: 'No transactions found'
                        };
                    }
        
                    return {
                        success: true,
                        data: response.data.result
                    };
            }

        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
}

module.exports = new WalletScanner();