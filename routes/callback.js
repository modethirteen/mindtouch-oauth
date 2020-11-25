const config = require('../config.json');
const oauth2 = require('simple-oauth2').create(config.oauth2);
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  if((req.query || {}).error) {
    res.json({
      error: req.query.error,
      description: req.query.error_description
    });
    req.session.oauth = null;
    return;
  }
  try {
    const result = await oauth2.authorizationCode.getToken({
      code: (req.query || {}).code,
      redirect_uri: 'http://localhost:3000/callback'
    });
    req.session.oauth = oauth2.accessToken.create(result).token;
  } catch (error) {
    console.log(error);
    res.json({});
    return;
  }
  res.redirect('http://localhost:3000');
});

module.exports = router;
