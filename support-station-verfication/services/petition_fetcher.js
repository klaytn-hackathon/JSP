const axios = require('axios');

class PetitionFetcher {
  static async fetch(petitionID) {
    const res = await axios.get(`${process.env.PETITION_ADDRESS}/${petitionID}`);
    if (res.status === 200) {
      return res.data;
    }
    return null;
  }
}

module.exports = PetitionFetcher;
