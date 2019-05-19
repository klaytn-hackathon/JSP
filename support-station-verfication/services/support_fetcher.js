const axios = require('axios');

class SupportFetcher {
  static async fetch(petitionID) {
    const res = await axios.get(`${process.env.SUPPORT_ADDRESS}?petition_id=${petitionID}`);
    if (res.status === 200) {
      return res.data.supports;
    }
    return null;
  }
}

module.exports = SupportFetcher;
