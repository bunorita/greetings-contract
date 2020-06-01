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

  it('has a default message', async () => {
    const message = await greetings.methods.message().call();
    assert.equal(message, 'Hello World');
  });


  it('can chage the message', async () => {
    await greetings.methods.setMessage('May the force be with you').send({
      from: accounts[0]
    });
    const message = await greetings.methods.message().call();
    assert.equal(message, 'May the force be with you');
  });
});