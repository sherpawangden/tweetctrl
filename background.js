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
        else {
            chrome.tabs.executeScript(activeInfo.tabId, {file: "setdate.js"});
        }
    });
});

