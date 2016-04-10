/*
* Carlhacks project by Joe Adkisson, Jon Bisila, Julia Connelly, and Kiya Govek
*/

    //Create an observer...
    var target = document.body;

    chrome.runtime.onMessage.addListener(function(request) {
        toggle = request.greeting;
    });
 
    // create an observer instance
    var observer = new window.MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            console.log('mutation type: '+ mutation.type);
            if(mutation.type == 'childList') {
                if (mutation.addedNodes.length >= 1) {
                          
                    chrome.runtime.sendMessage({greeting: "gimme the toggle dammit"});
                    chrome.runtime.onMessage.addListener(function(request) {
                        var toggle = request.greeting;
                    });
                    
                    makeUnicorns(toggle);
                }
            }
        });
    });
    // configuration of the observer:
    var config = { childList: true, subtree:true, characterData:true };
 
    // pass in the target node, as well as the observer options
    observer.observe(target, config);
    
    chrome.runtime.sendMessage({greeting: "gimme the toggle dammit"});
    chrome.runtime.onMessage.addListener(function(request) {
        var toggle = request.greeting;
    });

    makeUnicorns(toggle);


// Unicorn Mega-function. Makes all images on a page into unicorn images.
function makeUnicorns(toggleState) {
    console.log("Making some unicorns...");
    if(toggleState == 1) {
        console.log("Received go-ahead for unification...");
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
                return width
            } else if (style) {
                var width_regex = /width: ([0-9]*)px;/;
                var width_match = style.match(width_regex);
                if (width_match) {
                    return width_match[1]
                }
            }
            return ""
        }

        function getHeight(image) {
            var height = image.getAttribute('height');
            var style = image.getAttribute('style');
            if (height) {
                return height
            } else if (style) {
                var height_regex = /height: ([0-9]*)px;/;
                var height_match = style.match(height_regex);
                if (height_match) {
                    return height_match[1]
                }
            }
            return ""
        }

        function chooseImage(width, height) {
            if (!width || !height) {
                return randomImage();
            } else {
                var ratio = width / height;
                if (ratio == 1.0) {
                    return randomSquareImage();
                } else if (ratio > 1.3) {
                    return 'https://openmerchantaccount.com/img2/unicorn.png';
                } else if (ratio > 0.9) {
                    return 'https://openmerchantaccount.com/img2/unicorn_tongue.png';
                } else {
                    return 'https://openmerchantaccount.com/img2/mlp.png';
                }
            }
        }

        function randomImage() {
            var unicorns = [
                            'https://openmerchantaccount.com/img2/unicorn.png',
                            'https://openmerchantaccount.com/img2/defs_a_unicorn.jpg',
                            'https://openmerchantaccount.com/img2/unicorn_tongue.png',
                            'https://openmerchantaccount.com/img2/unicorn_cat.jpg',
                            'https://openmerchantaccount.com/img2/mlp.png']
            var randomChance = Math.random();
            randomChance = Math.floor(randomChance*unicorns.length);
            return unicorns[randomChance];
        }

        function randomSquareImage(){
            var squareUnicorns = [
                                    'https://openmerchantaccount.com/img2/unicorn_tongue.png' ]
            var randomChance = Math.random();
            randomChance = Math.floor(randomChance*squareUnicorns.length);
            return squareUnicorns[randomChance];

        }

    //}
}