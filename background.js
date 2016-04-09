/*
* Carlhacks project by Joe Adkisson, Jon Bisila, Julia Connelly, and Kiya Govek
* Thanks to The Chromium Authors for ideas on source code formatting
*/

var toggle = 0;

// Called when a new page finishes updating
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active && toggle == 1) {
    // do your things
    chrome.tabs.executeScript({
    		file: 'content.js'
  		});
  }
})

// chrome.addEventListener("load", function(tab) {
// 	if (toggle == 1) {
//     	// do your things
//     	chrome.tabs.executeScript({
//     		file: 'content.js'
//   		});
//  	}
//  });

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
	if (toggle == 0) {
        chrome.browserAction.setIcon({path: "icon.png"});
  		toggle = 1;
  		chrome.tabs.executeScript({
    		file: 'content.js'
  		});
  	}
  	else {
        chrome.browserAction.setIcon({path: "iconoff.png"});
  		toggle = 0;
  		//off

  	}


});