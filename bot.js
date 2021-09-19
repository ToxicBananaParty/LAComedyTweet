const fs = require('fs');
const twit = require('twit');
import PushNotifications from 'node-pushnotifications';

/*************
    STARTUP
*************/
let handles = JSON.parse(fs.readFileSync('./handles.json', 'utf-8'));
console.log(handles);