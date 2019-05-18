const Caver = require('caver-js');

const config = {
  rpcURL: 'https://api.baobab.klaytn.net:8651',
};

const cav = new Caver(config.rpcURL);

module.exports = cav;
