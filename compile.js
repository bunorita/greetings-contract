const path = require('path');
const solFile = 'Greetings.sol'
const greetingsPath = path.resolve(__dirname, 'contracts', solFile);

const fs = require('fs');
const solc = require('solc');

const source = fs.readFileSync(greetingsPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {},
  settings: {outputSelection: {'*': {'*': ['*']}}}
};
input.sources[solFile] = {
  content: source
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

module.exports = {
  interface: output.contracts[solFile]['Greetings'].abi,
  bytecode: output.contracts[solFile]['Greetings'].evm.bytecode.object,
};