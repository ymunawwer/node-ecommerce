const functions = require('firebase-functions');
const express =require('express');
const app = express();
app.get('/timestamp',(request,response)=>{
    response.send(`${Date.now()}`);
});

app.get('/timestamp-cache',(request,response)=>{
    // public enable cache on server,private cache only on user browser
    // max-age-how long we can store in user browser
    response.set('Cache-control','public','max-age=300','s-maxage=600');
    response.send(`${Date.now()}`);
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest(app);
