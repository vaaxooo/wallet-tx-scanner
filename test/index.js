const chai = require('chai');
const expect = chai.expect;
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const WalletScanner = require('../lib/index');

describe('WalletScanner', function () {
    let mockAxios;

    before(function () {
        mockAxios = new MockAdapter(axios);
    });

    afterEach(function () {
        mockAxios.reset();
    });

    after(function () {
        mockAxios.restore();
    });

    /* The code block you provided is a test case for the scenario where the `getTransactions` method of
    the `WalletScanner` class successfully fetches transactions for a given wallet address. */
    it('should fetch transactions successfully', async function () {
        const mockData = {
            result: [{ /* transaction data */ }],
        };

        const expectedResponse = {
            success: true,
            data: mockData.result,
        };

        mockAxios.onGet().reply(200, mockData);

        const result = await WalletScanner.getTransactions('0xd385bdf7709a642223ab8ee93884866689230966', 'ethereum');
        expect(result).to.deep.equal(expectedResponse);
    });

    /* The code block you provided is a test case for the scenario where no transactions are found for a
    given wallet address. */
    it('should handle no transactions found', async function () {
        const mockData = {
            result: [],
        };

        const expectedResponse = {
            success: false,
            message: 'No transactions found',
        };

        mockAxios.onGet().reply(200, mockData);

        const result = await WalletScanner.getTransactions('0xd385bdf7709a642223ab8ee93884866689230966', 'ethereum');
        expect(result).to.deep.equal(expectedResponse);
    });

    /* The code block you provided is a test case for handling an API error in the `WalletScanner` class. */
    it('should handle API error', async function () {
        const expectedResponse = {
            success: false,
            message: 'Request failed with status code 500',
        };
    
        mockAxios.onGet().reply(500, null, {
            'message': 'Request failed with status code 500',
        });
    
        const result = await WalletScanner.getTransactions('sample_address', 'ethereum');
        expect(result).to.deep.equal(expectedResponse);
    });
    
    
});
