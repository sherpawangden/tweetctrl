var currStorage;
var limit;
var totalTimeSpent;

function assignvariables() {

    chrome.storage.local.get(['counter', 'limitValue', 'totalTime', 'oldDate'],function(result) {
        currStorage = Number(result.counter);
        limit = Number(result.limitValue);
        totalTimeSpent = Number (result.totalTime);
        abd();
        currStorage += 1;
        chrome.storage.local.set({'counter' : currStorage}, function(){});
        var currTime = new Date();
        const currentTime = currTime.toJSON();
        const items = {'oldDate': currentTime }; 
        chrome.storage.local.set(items, () => {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
        }
});
    });
};

function abd() {
    if (Number(currStorage) >= Number(limit)) {
        if (totalTimeSpent > 60) {
            hourSpent = Math.floor(totalTimeSpent / 60)
            minutesSpent = totalTimeSpent % 60
            alert("You've been on Twitter " + currStorage + " times today for "+hourSpent+" hours and "+minutesSpent +" minutes");
        }
        else {
            alert("You've been on Twitter " + currStorage + " times today for "+totalTimeSpent+" minutes");

    }
}
    return;
};

chrome.storage.local.get(['saved'],function(result) {
    if (result.saved == "yes") {
        assignvariables();
    }
});














