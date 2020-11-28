function setTime() {
    chrome.storage.local.get(['totalTime', 'oldDate'],function(result) {
        const storedJSONDate = result.oldDate;
        const newDate = new Date();
        const newDateVal = newDate.getTime();
        const diff = Math.abs(newDateVal - storedJSONDate); 
        const timeinseconds = Math.round(diff/1000)
        const totalTime1 = Number(result.totalTime) + timeinseconds;
        chrome.storage.local.set({'totalTime' : totalTime1}, function(){});
    });
};

chrome.storage.local.get(['saved'],function(result) {
    if (result.saved == "yes") {
        setTime();
    }
});