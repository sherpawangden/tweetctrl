function setTime() {
    chrome.storage.local.get(['totalTime', 'oldDate'],function(result) {
        const storedJSONDate = result.oldDate;
        const testdate = new Date(storedJSONDate);
        const newDate = new Date();
        const diff = Math.abs(newDate-testdate); 
        const timeinseconds = Math.round(diff/60000)
        const totalTime1 = Number(result.totalTime) + timeinseconds;
        chrome.storage.local.set({'totalTime' : totalTime1}, function(){});
    });
};

chrome.storage.local.get(['saved'],function(result) {
    if (result.saved == "yes") {
        setTime();
    }
});