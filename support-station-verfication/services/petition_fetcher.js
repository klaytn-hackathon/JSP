const cav = require('../klaytn/caver');
const Contract = require('../klaytn/petition_contract');

class PetitionFetcher {
  constructor() {
    this.walletInstance = cav.klay.accounts.privateKeyToAccount(process.env.SECRET_KEY);
    cav.klay.accounts.wallet.add(this.walletInstance);
  }

  async fetch(petitionID) {
    const petition = await Contract.methods.petitionTable(
      petitionID,
    ).call(
      {
        from: this.walletInstance.address,
        gas: '20000000',
      },
    );

    return petition;
  }
}

module.exports = PetitionFetcher;
