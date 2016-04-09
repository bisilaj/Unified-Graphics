/*
* Carlhacks project by Joe Adkisson, Jon Bisila, Julia Connelly, and Kiya Govek
* Thanks to The Chromium Authors for ideas on source code formatting
*/
var toggle = 0;

// ///////////////////////////////////////////////////////////


// // Called when a new page finishes updating
// chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
//   if (changeInfo.status == 'complete' && tab.active && toggle == 1) {
//   	// select the target node
	
// 	////////////////////////////////////////////////////////////////
// 	// MAKE AN OBSERVER TO SEE WHEN THE DOM TREE CHANGES STRUCTURE
// 	////////////////////////////////////////////////////////////////
// 	var target = document.body;
 
// 	// create an observer instance
// 	var observer = new window.MutationObserver(function(mutations) {
// 		mutations.forEach(function(mutation) {
// 			console.log('mutation type: '+ mutation.type);
// 	 		if(mutation.type == 'childList') {
// 	 			if (mutation.addedNodes.length >= 1) {
// 	 				alert('added nodes');
// 	 			}
// 	 		}
// 	 	});
// 	});

// 	// 	mutations.foreach(function(mutation) {
// 	// 		console.log("MUTATION");
// 	// 	});
// 	// 	alert("MUTATION DETECTED. TOGGLE = "+toggle);
// 	// 	console.log("MUTATION DETECTED. TOGGLE = "+toggle);
// 	// 	if(toggle == 1) {
// 	// 		chrome.tabs.executeScript({
//  //    			file: 'content.js'
//  //  			});	
// 	// 	}
// 	// });
 
// 	// configuration of the observer:
// 	var config = { childList: true, subtree:true, characterData:true };
 
// 	// pass in the target node, as well as the observer options
// 	observer.observe(target, config);

// 	alert("OBSERVER IS OBSERVING");
// 	// later, you can stop observing
// 	//observer.disconnect();

// 	//////////////////////////////////////////////
// 	// Does it once automatically
// 	//////////////////////////////////////////////
//     // do your things
//     chrome.tabs.executeScript({
//     		file: 'content.js'
//   		});
//   }
// });

/////////////////////////////////////////////////////////

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
  		
		makeUnicorn(toggle);
  	}
  	else {
        chrome.browserAction.setIcon({path: "iconoff.png"});
  		toggle = 0;
  		//off

  	}
});