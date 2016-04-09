/*
* Carlhacks project by Joe Adkisson, Jon Bisila, Julia Connelly, and Kiya Govek
*/

var images = document.getElementsByTagName('img');

for (var i = 0; i < images.length; i++) {
    var image = images[i];

    var imageURL = chooseImage(getWidth(image), getHeight(image));
    image.setAttribute('src',imageURL);
    image.setAttribute('srcset',imageURL);

}

function getWidth(image) {
    var width = image.getAttribute('width');
    var style = image.getAttribute('style');
    if (width) {
        return width
    } else if (style) {
        var width_regex = /width: ([1234567890]*)px;/;
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
        var height_regex = /height: ([1234567890]*)px;/;
        var height_match = style.match(height_regex);
        if (height_match) {
            return height_match[1]
        }
    }
    return ""
}

function chooseImage(width, height) {
    if (!width || !height) {
        return 'https://openmerchantaccount.com/img2/defs_a_unicorn.jpg';
    } else {
        var ratio = width / height;
        if (ratio > 1.5) {
            return 'https://openmerchantaccount.com/img2/unicorn_cat.jpg';
        } else if (ratio > 1.3) {
            return 'https://openmerchantaccount.com/img2/unicorn.png';
        } else if (ratio > 0.9) {
            return 'https://openmerchantaccount.com/img2/unicorn_tongue.png';
        } else {
            return 'https://openmerchantaccount.com/img2/mlp.png';
        }
    }
}

function makeImage() {
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