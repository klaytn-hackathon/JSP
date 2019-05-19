const express = require('express');
const moment = require('moment');
const PetitionFetcher = require('../services/petition_fetcher');
const SupportFetcher = require('../services/support_fetcher');

const router = express.Router();

function formatDate(supports) {
  supports.forEach((support) => {
    // eslint-disable-next-line no-param-reassign
    support.created_at = moment(support.created_at).format('YYYY-MM-DD h:mm:ss a');
  });
}

router.get('/verification', async (req, res) => {
  const petition = await PetitionFetcher.fetch(req.query.petition_id);
  const supports = await SupportFetcher.fetch(req.query.petition_id);

  formatDate(supports);

  res.render('verification', {
    petition,
    supports,
    address: `https://baobab.klaytnscope.com/tx/${petition.transaction_id}`,
  });
});

module.exports = router;
