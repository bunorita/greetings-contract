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
// `output` here contains the JSON output as specified in the documentation
for (var contractName in output.contracts[solFile]) {
  // bytecode
  console.log(
      contractName + ': ' +
      output.contracts[solFile][contractName].evm.bytecode.object);

  // ABI
  for (const intf of output.contracts[solFile][contractName].abi) {
    console.log(intf);
  }
}

module.exports = output.contracts[solFile]['Greetings'];
