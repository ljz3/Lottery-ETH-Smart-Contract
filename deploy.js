const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    'INSERT MNEMONIC PHRASE HERE',
    'https://rinkeby.infura.io/v3/0903b6ff89ce48ebacacad2c3e0f0b1b'
);

const web3 = new Web3(provider);

const deploy = async () => {

    const accounts = await web3.eth.getAccounts();

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: '0x' + bytecode}) // add 0x bytecode
        .send({from: accounts[0]}); // remove 'gas'

    console.log(interface);
    console.log('Contract deployed to', result.options.address);
};
deploy();

