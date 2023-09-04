<h1>WalletScanner</h1>
<p><em>WalletScanner</em> is a JavaScript library that allows you to retrieve transaction data for a given wallet address on various blockchain networks. It uses API keys to interact with the blockchain network APIs and provides a simple way to fetch transaction information.</p>

<h2>Installation</h2>
<p>To install WalletScanner, use npm:</p>
<pre><code>npm install axios wallet-scanner</code></pre>

<h2>Usage</h2>
<p>First, require the WalletScanner module and create an instance:</p>
<pre><code>const WalletScanner = require('wallet-scanner');
const walletScanner = new WalletScanner();</code></pre>

<p>Then, you can use the <code>getTransactions</code> method to fetch transactions for a specific wallet address and blockchain network:</p>
<pre><code>const address = 'your_wallet_address';
const network = 'ethereum'; // or 'tron', 'polygon', 'bsc', 'optimism', 'arbitrum', etc.

const result = await walletScanner.getTransactions(address, network);
console.log(result);</code></pre>

<p>The method returns an object with properties <code>success</code>, <code>message</code>, and <code>data</code>. The <code>success</code> property indicates whether the request was successful or not. If <code>success</code> is <code>true</code>, the <code>data</code> property contains the result of the transaction list. If <code>success</code> is <code>false</code>, the <code>message</code> property contains an error message.</p>

<h2>API Keys</h2>
<p>Please note that this library requires API keys to access blockchain network APIs. You need to provide API keys for different blockchain networks by initializing the <code>protectedKeys</code> object inside the <code>WalletScanner</code> constructor.</p>

<h2>Contributing</h2>
<p>Contributions to the WalletScanner library are welcome. Feel free to submit issues and pull requests on the GitHub repository: <a href="https://github.com/your-username/wallet-scanner">https://github.com/your-username/wallet-scanner</a></p>

<h2>License</h2>
<p>This project is licensed under the MIT License - see the <a href="LICENSE.md">LICENSE.md</a> file for details.</p>