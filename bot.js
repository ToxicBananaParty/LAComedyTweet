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
const texter = new twilio('ACb2c781c92ebc857aeb4717abb1964ffa', 'b0487e88dcbb4535fc5a54e08211324f');
const twitter = new twit({
    consumer_key: '6z6rgu0luuxlEMFUqHmn8uW4v',
    consumer_secret: 'usIECLmDid9U5vPYOFGateTtyx5cH7dDGhyLdHkNwDklCu2P3a',
    access_token: '1409971423100096512-L2lucDeldv02OO598wvGKxMNolg7QR',
    access_token_secret: 'staeXbQwlZk08lavyFwPB4VftgRTcby2ak2gqHPAn39jk',
    timeout_ms: 60*1000,
    strictSSL: false
});

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
