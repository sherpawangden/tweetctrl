var enabled = 0;
var timerDuration;
var longTimerDuration;
var limitValue;
var limitMinutes;

function setMinutes(){
    limitValue = document.getElementById('limitTime').value;
    limitMinutes = document.getElementById('limitMinutes').value;
}


function checkAlarms(){
    var storedTime;
    chrome.storage.local.get(['limitValue'],function(result) {
        storedTime = result.limitValue
    });
    var limitTimes;
    chrome.storage.local.get(['limitMinutes'],function(result) {
        limitTimes = result.limitMinutes
    });

    chrome.storage.local.get(['saved'],function(result) {
        if (result.saved == 'yes'){
            document.getElementById('limitTime').value = Number(storedTime); 
            document.getElementById('limitMinutes').value = Number(limitTimes);     
            document.getElementById('selectConfirm').style.opacity = "1";  
            turnButtonOff();
        }
    });
    
}

function turnButtonOff () {
    document.getElementById("setLongDuration").style.display = "none";
    document.getElementById("stopStretches").style.display = "inline-block";

}

function turnButtonOn () {
    document.getElementById("stopStretches").style.display = "none";
    document.getElementById("setLongDuration").style.display = "inline-block";
}

checkAlarms();

function setLimit() {
    setMinutes()
    if (limitValue != 0){
        console.log("alarm set");
        chrome.runtime.sendMessage('', {
        type: 'createMessage',
      });
    }
    chrome.storage.local.set({'saved': 'yes'}, function(){});
    chrome.storage.local.set({'limitValue': limitValue}, function(){});
    chrome.storage.local.set({'limitMinutes': limitMinutes}, function(){});
    chrome.storage.local.set({'counter' : 1}, function(){});
    chrome.storage.local.set({'totalTime' : 0}, function(){});
    chrome.storage.local.set({'oldDate' : 0}, function(){});
    checkCurrTab();

}

function checkCurrTab(){
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        if (url.includes('twitter.com')) {
            chrome.tabs.executeScript({file: "content.js"});
        };
});
}


function cancelLimit() {
    chrome.storage.local.set({'saved': 'no'}, function(){});
}

document.getElementById("setLongDuration").addEventListener('click', () => {
    enabled = 1;    
    document.getElementById('selectConfirm').style.opacity = "1";
    turnButtonOff() ;
    setLimit() ;}  
    );  

document.getElementById("stopStretches").addEventListener('click', () => {
    cancelLimit();
    turnButtonOn();
    document.getElementById('selectConfirm').style.opacity = "0";
});


