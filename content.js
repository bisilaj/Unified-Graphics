/*
* Carlhacks project by Joe Adkisson, Jon Bisila, Julia Connelly, and Kiya Govek
*/

var images = document.getElementsByTagName('img');

for (var i = 0; i < images.length; i++) {
    var image = images[i];
    var imageURL = makeImage();
    console.log(imageURL);
    image.setAttribute('src',imageURL);
    image.setAttribute('srcset',imageURL);

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