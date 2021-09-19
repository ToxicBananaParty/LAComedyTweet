const fs = require('fs');
const twit = require('twit');
const PushNotification = require('node-pushnotifications').PushNotification;

/*=============
    STARTUP
==============*/
const twitter = new twit({
    consumer_key: '6z6rgu0luuxlEMFUqHmn8uW4v',
    consumer_secret: 'usIECLmDid9U5vPYOFGateTtyx5cH7dDGhyLdHkNwDklCu2P3a',
    access_token: '1409971423100096512-L2lucDeldv02OO598wvGKxMNolg7QR',
    access_token_secret: 'staeXbQwlZk08lavyFwPB4VftgRTcby2ak2gqHPAn39jk',
    timeout_ms: 60*1000,
    strictSSL: false
});

const userIdPairs = JSON.parse(fs.readFileSync('./handles.json', 'utf-8'));
let users = [];
for(let username in userIdPairs) {
    users.push(userIdPairs[username]);
}

let stream = twitter.stream('statuses/filter', {
    follow: users
});

stream.on('tweet', (tweet) => {
    if(tweet.entities.urls) {
        console.log("INSIDE SPECIAL IF\nURLS ARR IS: " + tweet.entities.urls);
    }
    if(tweet.truncated)
        parseTweet(tweet.extended_tweet.full_text);
    else 
        parseTweet(tweet.text);
});


/*=====================================
    PARSE TWEET & PREPARE RESPONSE
======================================*/
function parseTweet(tweet) {
    console.log(tweet);
}