var router = require('express').Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated()
  });
});

router.get('/profile', requiresAuth(), async function (req, res, next) {
  let { token_type, access_token } = req.oidc.accessToken;
  let id_token = req.oidc.idTokenClaims

  console.log("token_type", token_type)
  console.log("access_token", access_token);
  console.log("id_token", id_token);

  const userInfo = await req.oidc.fetchUserInfo();
  console.log("userInfo", userInfo);

  res.render('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page'
  });
});

module.exports = router;
