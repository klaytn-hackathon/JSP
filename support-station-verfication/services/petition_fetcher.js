const axios = require('axios');

class PetitionFetcher {
  static async fetch(petitionID) {
    const res = await axios.get(`${process.env.PETITION_ADDRESS}?petition_id=${petitionID}`);
    if (res.status === 200) {
      return res.data.petitions[0];
    }
    return null;
  }
}

module.exports = PetitionFetcher;
