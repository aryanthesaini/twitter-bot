require('dotenv').config({ path: require('find-config')('.env') });
var Twitter = require('twitter');
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// const twitterMessage= 'ok this is attempt2'

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const gaali = [
  ' chup lodu',
  ' please chup hoja bhai',
  ' mat khola kar muh',
  ' i muted you but that was not enough',
  ' go get some bitches',
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

app.post('/twitter', (req, res) => {
  // console.log(req.body)
  const index = getRandomInt(5);
  // console.log(index);
  let tweetThis = '@';
  tweetThis += req.body.username;
  tweetThis += `${gaali[index]}`;

  const params = {
    status: tweetThis,
  };
  client.post('statuses/update', params, function (error, tweet, response) {
    if (error) {
      console.log(error);
      res.status(500).json({
        message: `we could not do this because ${error}`,
      });
      return;
    }

    res.json({
      message: ' We did this',
    });
    // console.log(tweet);
    // console.log(response);
  });
});

app.get('/status', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`listening on port ${PORT}`));
