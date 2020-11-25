const config = require('../config.json');
const oauth2 = require('simple-oauth2').create(config.oauth2);
const express = require('express');
const request = require('request');
const router = express.Router();

router.get('/', async (req, res, next) => {
    if(req.session.oauth) {
        let accessToken = oauth2.accessToken.create(req.session.oauth);
        if(accessToken.expired()) {
            console.log("Access token is expired");
            try {
                accessToken = await accessToken.refresh({
                    scope: accessToken.token.scope
                });
                req.session.oauth = accessToken.token;
            } catch (error) {
                console.log('Error refreshing access token: ', error.message);
            }
        }
    }
    const result = await new Promise((resolve) => {
        request.get(`${config.api.host}/@api/deki/users/current/authorizations?dream.out.format=json`, {
            'auth': {
                'bearer': req.session.oauth ? req.session.oauth.access_token : ''
            }
        }, (err, resp, body) => {
            try {
                resolve(JSON.parse(body));
            } catch {
                resolve(body);
            }
        });
    });
    res.render('index', {
        title: 'MindTouch OAuth 2.0 API Access',
        href: {
            authorize_unseated: oauth2.authorizationCode.authorizeURL({
                redirect_uri: 'http://localhost:3000/callback',
                scope: 'profile'
            }),
            authorize_seated: oauth2.authorizationCode.authorizeURL({
                redirect_uri: 'http://localhost:3000/callback',
                scope: 'profile seated'
            }),
            consent_unseated: oauth2.authorizationCode.authorizeURL({
                redirect_uri: 'http://localhost:3000/callback',
                prompt: 'consent',
                scope: 'profile'
            }),
            consent_seated: oauth2.authorizationCode.authorizeURL({
                redirect_uri: 'http://localhost:3000/callback',
                prompt: 'consent',
                scope: 'profile seated'
            })
        },
        oauth: JSON.stringify(config.oauth2.client, null, 2),
        session: JSON.stringify(req.session, null, 2),
        result: JSON.stringify(result, null, 2)
    });
});

module.exports = router;