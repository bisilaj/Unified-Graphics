/*
* Carlhacks project by Joe Adkisson, Jon Bisila, Julia Connelly, and Kiya Govek
*/

var images = document.getElementsByTagName('img');

for (var i = 0; i < images.length; i++) {
    var image = images[i];
    image.setAttribute('src','https://openmerchantaccount.com/img2/unicorn.png');
    image.setAttribute('srcset','https://openmerchantaccount.com/img2/unicorn.png');
    //https://openmerchantaccount.com/img2/unicorn_tongue.png
    //https://openmerchantaccount.com/img2/unicorn_cat.jpg
}