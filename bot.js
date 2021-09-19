const fs = require('fs');
const twit = require('twit');
const PushNotification = require('node-pushnotifications').PushNotification;

/*************
    STARTUP
*************/
let handles = JSON.parse(fs.readFileSync('./handles.json', 'utf-8'));
console.log(handles);