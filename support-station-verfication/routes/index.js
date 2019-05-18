const express = require('express');
const PetitionFetcher = require('../services/petition_fetcher');
const Contract = require('../klaytn/petition_contract');

const router = express.Router();

router.get('/verification', async (req, res) => {
  const fetcher = new PetitionFetcher();
  const petition = await fetcher.fetch(req.query.petition_id);
  res.render('verification', {
    petition,
    address: `https://baobab.klaytnscope.com/account/${Contract._address}`,
  });
});

module.exports = router;
