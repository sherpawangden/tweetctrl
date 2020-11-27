function setTime() {
    chrome.storage.local.get(['totalTime', 'oldDate'],function(result) {
        const storedJSONDate = result.oldDate;
        const testdate = new Date(storedJSONDate);
        var newDate = new Date();
        var diff = Math.abs(newDate-testdate); 
        var totalTime1 = Number(result.totalTime) + Math.round(diff/100000);
        chrome.storage.local.set({'totalTime' : totalTime1},function(){});
    });
};

chrome.storage.local.get(['saved'],function(result) {
    if (result.saved == "yes") {
        setTime();
    }
});