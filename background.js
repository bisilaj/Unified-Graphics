/*
* Carlhacks project by Joe Adkisson, Jon Bisila, Julia Connelly, and Kiya Govek
* Thanks to The Chromium Authors for ideas on source code formatting
*/
var toggle = 0;



// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
	if (toggle == 0) {
  		toggle = 1;
  		chrome.tabs.executeScript({
    		file: 'content.js'
  		});
  	}
  	else {
  		toggle = 0;
  		//off

  	}


});