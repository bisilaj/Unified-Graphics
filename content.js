/*
* Carlhacks project by Joe Adkisson, Jon Bisila, Julia Connelly, and Kiya Govek
*/

    var toggle = 0; // default to 0, but this should be set the right value pretty fast
    var unicornImageList = [];

    // create an observer instance
    var observer = new window.MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            console.log('mutation type: '+ mutation.type);
            if(mutation.type == 'childList') {
                if (mutation.addedNodes.length >= 1) {
                    // // We don't need to ask for toggle again - we should already know,
                    // // and it's the background script's responsibility to say when
                    // // it changes.
                    makeUnicorns(toggle);
                }
            }
        });
    });
    // configuration of the observer:
    var config = { childList: true, subtree:true, characterData:true };
    // pass in the target node, as well as the observer options
    observer.observe(document.body, config);
    


    // set up listener for toggle; whenever it gets a new value, it should
    // run makeUnicorns accordingly
    chrome.runtime.onMessage.addListener(function(request) {
        toggle = request.greeting;
        if(request.listOfImages != null) { unicornImageList = request.listOfImages;}
        makeUnicorns(toggle);
    });
    
    // ask for toggle for the initial pageload
    chrome.runtime.sendMessage({greeting: "gimme the toggle dammit"});



// Unicorn Mega-function. Makes all images on a page into unicorn images.
function makeUnicorns(toggleState) {

    
    if(toggleState == 1) {
        console.log("Making some unicorns...");
        replaceImgTags();
        replaceStyleImages();
    }
        function replaceImgTags() {
            var images = document.getElementsByTagName('img');
            for (var i = 0; i < images.length; i++) {
                var image = images[i];
                var imageClass = image.getAttribute('class');
                var isUnicorn = false;
                if(imageClass != null) {
                    isUnicorn = image.getAttribute('class').split(' ').some(function(w){return w === 'carlhacks_unicorn'});
                };
                
                if(!isUnicorn) {
                    var imageURL = chooseImage(getWidth(image), getHeight(image));

                    image.setAttribute('src',imageURL);
                    image.setAttribute('srcset',imageURL);            
                    image.setAttribute('class', imageClass + ' carlhacks_unicorn');
                }
            }
        }

        function replaceStyleImages() {
            var style_images = document.evaluate("//*[contains(@style, 'background:') or contains(@style, 'background-image:')]",
             document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
            var image_list = [];
            var index = 0;
            try {
              var node = style_images.iterateNext();
              
              // add nodes to list so can edit document while iterating
              while (node) {
                image_list[index] = node;
                node = style_images.iterateNext();
                index++
              } 
            }
            catch (e) {
              console.log( 'Error: Document tree modified during iteration ' + e );
            }
            for (var i = 0; i < image_list.length; i++) {
                node = image_list[i];
                var imageClass = node.getAttribute('class');
                var isUnicorn = false;
                if(imageClass != null) {
                    isUnicorn = node.getAttribute('class').split(' ').some(function(w){return w === 'carlhacks_unicorn'});
                };
                
                if(!isUnicorn) {
                    var imageURL = chooseImage(getWidth(node), getHeight(node));
                    var image_style = node.getAttribute('style');
                    var background_regex = /(background(-image)?:.*)(url\(.*?\))(.*(;)?)$/;
                    image_style = image_style.replace(background_regex, '$1url("'+imageURL+'")$4');
                    node.setAttribute('style', image_style);          
                    node.setAttribute('class', imageClass + ' carlhacks_unicorn');
                }
            }
        }

        function getWidth(image) {
            var width = image.getAttribute('width');
            var style = image.getAttribute('style');
            if (width) {
                return width;
            } else if (style) {
                var width_regex = /width: ([0-9]*)px;/;
                var width_match = style.match(width_regex);
                if (width_match) {
                    return width_match[1];
                }
            }
            return "";
        }

        function getHeight(image) {
            var height = image.getAttribute('height');
            var style = image.getAttribute('style');
            if (height) {
                return height;
            } else if (style) {
                var height_regex = /height: ([0-9]*)px;/;
                var height_match = style.match(height_regex);
                if (height_match) {
                    return height_match[1];
                }
            }
            return "";
        }





        function chooseImage(width, height) {
            if (!width || !height) {
                console.log("values not found; using a random image.");
                return randomImage();
            } else {
                return chooseBestImage(width, height);
            }
        }

        // Chooses the image whose aspect ratio is the best fit for the image
        // that it's replacing. The 'ratio' argument, for the record, is 
        // width / height.
        function chooseBestImage(width, height) {

            // url, width, height
            // var TempunicornList = [
            //         ['https://openmerchantaccount.com/img2/unicorn.png',264, 191],
            //         ['https://openmerchantaccount.com/img2/defs_a_unicorn.jpg',236, 211],
            //         ['https://openmerchantaccount.com/img2/unicorn_tongue.png',540,530],
            //         ['https://openmerchantaccount.com/img2/unicorn_cat.jpg',1920,1080],
            //         ['https://openmerchantaccount.com/img2/mlp.png',1024,1103]
            //       ];


            var ratio = width / height; // ratio of our image
            // Square
            if (ratio == 1.0) { return randomSquareImage(); }

            // Not Square
            var bestIndex = 0;
            var bestRatio = 0;
            var curRatio = 0;
            for (var i = 0; i < unicornImageList.length-1; i++) {
                // Find the ratio of the current entry
                curRatio = unicornImageList[i][1]/unicornImageList[i][2];
                // If they are the same Aspect Ratio
                if(curRatio == bestRatio) {
                    // If the new one is closer-sized to the original
                    if(Math.abs(unicornImageList[i][1] - width) > Math.abs(unicornImageList[bestIndex][1] - width)) {
                        bestIndex = i;
                        // don't need to change bestRatio; they're the same.
                    }
                    // otherwise it stays the same.
                }

                // If the new one is better than current best
                //if(curRatio > bestRatio && curRatio <= ratio) {
                if(Math.abs(ratio - curRatio) < Math.abs(ratio - bestRatio)) {
                    bestIndex = i;
                    bestRatio = curRatio
                }
                // If the new one is worse, do nothing

            }
            console.log("best contender is image " + bestIndex + " with aspect ratio " + bestRatio);
            return unicornImageList[bestIndex][0];
        }

        function randomImage() {
            var randomChance = Math.random();
            // randomChance = Math.floor(randomChance*unicorns.length);
            // return unicorns[randomChance];
            randomChance = Math.floor(randomChance*unicornImageList.length);
            return unicornImageList[randomChance][0];
        }

        function randomSquareImage(){
            var squareUnicorns = [
                                    'https://openmerchantaccount.com/img2/unicorn_tongue.png',
                                    'https://openmerchantaccount.com/img2/swirl.png',
                                    'https://openmerchantaccount.com/img2/moon_unicorn.jpg' ]
            var randomChance = Math.random();
            randomChance = Math.floor(randomChance*squareUnicorns.length);
            return squareUnicorns[randomChance];

        }

    //}
}