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

const texter = new twilio(twilioParams);
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
    console.log(JSON.stringify(tweet, null, 4));
    if(tweet.entities.urls.length > 0) {
        console.log("\n\nINSIDE SPECIAL IF\nURLS ARR IS:\n " + JSON.stringify(tweet.entities.urls[0], null, 4) + "\n\n");
    }
    if(tweet.truncated)
        parseTweet(tweet.extended_tweet.full_text, tweet.user.screen_name);
    else 
        parseTweet(tweet.text, tweet.user.screen_name);
});


/*=====================================
    PARSE TWEET & PREPARE RESPONSE
======================================*/
// Figure out if tweet is linking tickets for sale
function parseTweet(tweet, user) {
    console.log("User: " + user + "\nSays: " + tweet);
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
