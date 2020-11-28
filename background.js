// myURLs contains the websites where you want your content script to run
const myURLs = ['www.twitter.com', 'www.facebook.com'];

chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab){
        y = tab.url;
        // alert(y);
        if (y.includes('twitter.com')) {
            // alert("in here");
            chrome.tabs.executeScript(activeInfo.tabId, {file: "content.js"});
        } 
        else if (y.includes("chrome://")) {
        }
        else {
            chrome.tabs.executeScript(activeInfo.tabId, {file: "setdate.js"});
        }
    });
});


function createAlarm(){
    console.log("created");
    chrome.alarms.create('shortAlarm', {
        delayInMinutes: 1000, periodInMinutes: 1000});
}

function clearAlarm(){
    chrome.alarms.clearAll();
}

chrome.alarms.onAlarm.addListener( function (alarm) {
    chrome.tabs.onActivated.addListener(function (activeInfo) {
        chrome.tabs.get(activeInfo.tabId, function(tab){
            y = tab.url;
            // alert(y);
            if (y.includes('twitter.com')) {
                // alert("in here");
                chrome.tabs.executeScript(activeInfo.tabId, {file: "content.js"});
            } 
            else if (y.includes("chrome://")) {
            }
            else {
                chrome.tabs.executeScript(activeInfo.tabId, {file: "setdate.js"});
            }
        });
    });
});



//Checks if the message is for a short or a long message and creates notification
//accordingly 
chrome.runtime.onMessage.addListener(data => {

    if (data.type == 'clearMessage') {
        console.log('clear called');
        clearAlarm();
    }
    if (data.type == 'createMessage'){
        console.log('create called');
        timerDuration = data.timePeriod;
        createAlarm();
    }

    if (data.type == 'createLongMessage'){
        console.log('long create called');
        longTimerDuration = data.timePeriod;
        createLongAlarm();
    }
    if (data.type == 'getNow'){
        getNow();
        bool = 2;
    }
    if (data.type == "muteMessage") {
        mute = 0;
    }
    if (data.type == "unmuteMessage") {
        mute = 1;
    }
    if (data.type == "unmuteLightMessage") {
        mute = 2;
    }
  });


//Checks if the message is for a short or a long message and creates notification
//accordingly 
chrome.runtime.onMessage.addListener(data => {

    if (data.type == 'clearMessage') {
        console.log('clear called');
        clearAlarm();
    }
    if (data.type == 'createMessage'){
        console.log('create called');
        timerDuration = data.timePeriod;
        createAlarm();
    }

  });

