/*
* Carlhacks project by Joe Adkisson, Jon Bisila, Julia Connelly, and Kiya Govek
* Thanks to The Chromium Authors for ideas on source code formatting
*/
var toggle = 0;

// Load images from a list and get their width and height.
function getDimensions(url) {
  var img = $('<img src="'+url+'"/>').load(function(){
      finalImageList.push([url,this.width,this.height]);
      //alert(this.width + ' x ' + this.height);
      alert("imagelist: "+finalImageList);
  });
}

var finalImageList = [];
var imageList = ['https://openmerchantaccount.com/img2/unicorn.png',
                 'https://openmerchantaccount.com/img2/defs_a_unicorn.jpg',
                 'https://openmerchantaccount.com/img2/unicorn_tongue.png',
                 'https://openmerchantaccount.com/img2/unicorn_cat.jpg',
                 'https://openmerchantaccount.com/img2/evil unicorn.jpg',
                 'https://openmerchantaccount.com/img2/mlp.png'];

// Add everything to the list, with dimensions attached.
for(var i = 0; i < imageList.length-1; i++) {
  getDimensions(imageList[i]);
}





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

// Sends the toggle status to content.js on request.
// This happens when a new page is loaded; thus we also send the list of images.
chrome.runtime.onMessage.addListener(function(request) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: toggle, listOfImages: finalImageList});
    });
});