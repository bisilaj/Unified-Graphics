	//NEEDS AN EVENT LISTENER TO ASK BACKGROUND.JS ABOUT THE TOGGLE STATE


	////////////////////////////////////////////////////////////////
	// MAKE AN OBSERVER TO SEE WHEN THE DOM TREE CHANGES STRUCTURE
	////////////////////////////////////////////////////////////////
	var target = document.body;
 
	// create an observer instance
	var observer = new window.MutationObserver(function(mutations) {
		mutations.forEach(function(mutation) {
			console.log('mutation type: '+ mutation.type);
	 		if(mutation.type == 'childList') {
	 			if (mutation.addedNodes.length >= 1) {
	 				makeUnicorns(true);
	 			}
	 		}
	 	});
	});

	// 	mutations.foreach(function(mutation) {
	// 		console.log("MUTATION");
	// 	});
	// 	alert("MUTATION DETECTED. TOGGLE = "+toggle);
	// 	console.log("MUTATION DETECTED. TOGGLE = "+toggle);
	// 	if(toggle == 1) {
	// 		chrome.tabs.executeScript({
 //    			file: 'content.js'
 //  			});	
	// 	}
	// });
 
	// configuration of the observer:
	var config = { childList: true, subtree:true, characterData:true };
 
	// pass in the target node, as well as the observer options
	observer.observe(target, config);
	// later, you can stop observing
	//observer.disconnect();

	
	makeUnicorns(true);