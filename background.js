/*
* Carlhacks project by Joe Adkisson, Jon Bisila, Julia Connelly, and Kiya Govek
* Thanks to The Chromium Authors for ideas on source code formatting
*/
var toggle = 0;

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    if (toggle == 0) {
        //we're currently off; turn it on
        chrome.browserAction.setIcon({path: "icon.png"});
  		  toggle = 1;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {greeting: toggle});
        });
        
    }
    else {
        //we're currently on; turn it off
        chrome.browserAction.setIcon({path: "iconoff.png"});
  		  toggle = 0;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {greeting: toggle});
        });
    }
});

chrome.runtime.onMessage.addListener(function(request) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: toggle});
    });
});