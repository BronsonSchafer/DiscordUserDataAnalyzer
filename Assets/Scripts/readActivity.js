// import and store activity data 
var XMLHttpRequest = require('xhr2');
//var xhr = new XMLHttpRequest();

exports.readFile = function(){
    console.log("reading data");

    //let json = require('file:///C:/Users/brons/Desktop/Discordpackage/activity/analytics.json');
    //console.log(json);

    const fs = require('fs');
    const fileContent = fs.readdirSync('C:/Users/brons/Desktop/Discordpackage/activity/analytics');
    console.log(fileContent.toString());

    const rawdata = fs.readFileSync('C:/Users/brons/Desktop/Discordpackage/activity/analytics/'+fileContent[0]);
    let data = JSON.parse(rawdata.toString());
    //console.log(rawdata.toString());

    //usage:
    //readTextFile("/Users/brons/Desktop/Discordpackage/activity/analytics.json", function(text){
    //    var data = JSON.parse(text);
    //    console.log(data);
    //});
}