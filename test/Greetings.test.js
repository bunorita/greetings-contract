const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const {interface, bytecode} = require('../compile');

let accounts;
let greetings;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  greetings = await new web3.eth.Contract(interface)
                  .deploy({data: bytecode, arguments: ['Hello World']})
                  .send({from: accounts[0], gas: '1000000'});
});

describe('Greetings', () => {
  it('deploys a greetings contract', () => {
    console.log(greetings);
    assert.ok(greetings.options.address)
  });
});