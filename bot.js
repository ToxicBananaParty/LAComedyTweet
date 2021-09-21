// TODO:
// - Prevent duplicate links (parsed.json?)

const fs = require('fs');
const twit = require('twit');
const twilio = require('twilio');

/*=============
    STARTUP
==============*/
// Init twilio and twitter bots
const senderNum = '+16179345848'
const phoneNums = ['+15138822228', '+17657601991'];

const twilioParams = JSON.parse(fs.readFileSync('./apikeys/twilio.json', 'utf-8'));
const twitParams = JSON.parse(fs.readFileSync('./apikeys/twitter.json', 'utf-8'));

//const texter = new twilio(twilioParams);
const twitter = new twit(twitParams);

// Get UserIDs from handles.json
const userIdPairs = JSON.parse(fs.readFileSync('./handles.json', 'utf-8'));
let users = [];
for(let username in userIdPairs) {
    users.push(userIdPairs[username]);
}

// Start twitter stream
let stream = twitter.stream('statuses/filter', {
    follow: users
});

// Catch tweets from stream
stream.on('tweet', (tweet) => {
    
    if(tweet.truncated) {
        if(tweet.entities.urls.length > 0) {
            parseTweet(tweet.extended_tweet.full_text, tweet.user.screen_name, tweet.entities.urls[0].expanded_url);
        } else {
            parseTweet(tweet.extended_tweet.full_text, tweet.user.screen_name);
        }
    } else {
        if(tweet.entities.urls.length > 0) {
            parseTweet(tweet.text, tweet.user.screen_name, tweet.entities.urls[0].expanded_url);
        } else {
            parseTweet(tweet.text, tweet.user.screen_name);
        }
    }
});


/*=====================================
    PARSE TWEET & PREPARE RESPONSE
======================================*/
// Figure out if tweet is linking tickets for sale
function parseTweet(tweet, user, url) {
    console.log("\nUser: " + user + "\nSays: " + tweet + "\nWith URL: " + url);
}

/*=============
     DEBUG
==============*/
parseTweet("CUSTOMTEST", "CustomTest");

/*
phoneNums.forEach(phoneNum => {
    texter.messages.create({
        body: "Hello this is Ryan's Twitter Bot\nIf you're reading this I'M ALIIIIIIIVE!",
        from: senderNum,
        to: phoneNum
    }).then(message => console.log(message.sid)).done();
});
*/
