/*
* Carlhacks project by Joe Adkisson, Jon Bisila, Julia Connelly, and Kiya Govek
*/

var images = document.getElementsByTagName('img');

for (var i = 0; i < images.length; i++) {
    var image = images[i];
    //image.setAttribute('src','https://openmerchantaccount.com/img2/unicorn.png');
    //image.setAttribute('srcset','https://openmerchantaccount.com/img2/unicorn.png');

    image.setAttribute('src',makeImage());
    image.setAttribute('srcset',makeImage());

}


function makeImage() {
    var unicorns = ['http://img05.deviantart.net/28eb/i/2011/180/c/9/unicorn_poop_by_gremlinlegions-d3kh3s4.jpg',
                    'http://images.clipartpanda.com/cute-unicorn-clipart-unicorn4.png',
                    'http://41.media.tumblr.com/30b1b0d0a42bca3759610242a1ff0348/tumblr_nnjxy1GQAA1tpo3v2o1_540.jpg']
    var randomChance = Math.random();
    randomChance = Math.floor(randomChance*unicorns.length)+1;
    return unicorns[randomChance];
}