const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

function getToken(user){
            //We don't want to store the sensitive information such as the
          //user password in the token so we pick only the email and id
          const body = { _id : user._id, email : user.email };
          //Sign the JWT token and populate the payload with the user email and id
          return jwt.sign({ user : body }, 'top_secret');
          //Send back the token to the user
}

//router.get('/test', (req, res) => res.send("test"));

//router.get('/api', (req, res) => res.send("api"));

router.get('/', function (req, res) {
  res.send(`
    <div>signup (post)</div>
    <div>login (post)</div>
    <div>users  (get) users list</div>
    <div>todo (get) list</div>
    <div>todo (post) add</div>
    <div>todo/:id (put)</div>
    <div>todo/:id (delete)</div>
  `);
});

//When the user sends a post request to this route, passport authenticates the user based on the
//middleware created previously
router.post('/signup', passport.authenticate('signup', { session : false }) , async (req, res, next) => {
  return res.json({ token: getToken(req.user), id: req.user._id, email: req.user.email });
})

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {     
      try {
        if(!user){
          const error = new Error('User not found')
          error.status = 404;
          return next(error);
        }else if(err){
          const error = new Error('An Error occurred')
          return next(err);
        }
        req.login(user, { session : false }, async (error) => {
          if( error ) return next(error)
          //We don't want to store the sensitive information such as the
          //user password in the token so we pick only the email and id
          const body = { _id : user._id, email : user.email };
          //Sign the JWT token and populate the payload with the user email and id
          const token = jwt.sign({ user : body }, 'top_secret');
          //Send back the token to the user
          return res.json({ token, id: user._id, email: user.email });
        });     
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });
  
  module.exports = router;
