// import and store activity data 

var name = "test";

exports.readFile = function(){
    console.log("reading data");

    let json = require('file:///C:/Users/brons/Desktop/Discordpackage/activity/analytics.json');
    console.log(json);
}