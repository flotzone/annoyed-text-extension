chrome.storage.local.get('WritingIsActive', function(data){
    if (data.WritingIsActive === undefined){
        chrome.storage.local.set({'WritingIsActive' : false});
    }
});
