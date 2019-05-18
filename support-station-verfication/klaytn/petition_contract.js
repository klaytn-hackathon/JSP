const fs = require('fs');
const path = require('path');
const cav = require('./caver');

const DEPLOYED_ABI = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'deployedABI'), 'utf8'));
const DEPLOYED_ADDRESS = fs.readFileSync(path.join(__dirname, '..', 'deployedAddress'), 'utf8');

const PetitionContract = DEPLOYED_ABI
  && DEPLOYED_ADDRESS
  && new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);

module.exports = PetitionContract;
