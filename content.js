var currStorage;
var limit;
var totalTimeSpent;

function assignvariables() {

    chrome.storage.local.get(['counter', 'limitValue', 'totalTime', 'oldDate'],function(result) {
        currStorage = Number(result.counter);
        limit = Number(result.limitValue);
        totalTimeSpent = Number (result.totalTime);
        check(totalTimeSpent);
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

function check(totalTime) {
    if (Number(currStorage) >= Number(limit)) {
        if (totalTime > 60) {
            hourSpent = Math.floor(totalTime / 60)
            minutesSpent = totalTime % 60
            alert("You've been on Twitter " + currStorage + " times today for "+hourSpent+" hours and "+minutesSpent +" minutes");
        }
        else {
            alert("You've been on Twitter " + currStorage + " times today for "+totalTime+" minutes");

    }
}
    return;
};

chrome.storage.local.get(['saved'],function(result) {
    if (result.saved == "yes") {
        assignvariables();
    }
});














