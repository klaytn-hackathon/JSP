const PetitionContract = artifacts.require("./PetitionContract.sol")
const fs = require('fs')

module.exports = function (deployer) {
  deployer.deploy(PetitionContract)
    .then(() => {
    // Record recently deployed contract address to 'deployedAddress' file.
    if (PetitionContract._json) {
      // Save abi file to deployedABI.
      fs.writeFile(
        'deployedABI',
        JSON.stringify(PetitionContract._json.abi, 2),
        (err) => {
          if (err) throw err
          console.log(`The abi of ${PetitionContract._json.contractName} is recorded on deployedABI file`)
        })
    }

    fs.writeFile(
      'deployedAddress',
      PetitionContract.address,
      (err) => {
        if (err) throw err
        console.log(`The deployed contract address * ${PetitionContract.address} * is recorded on deployedAddress file`)
    })
  })
}