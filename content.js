var images = document.getElementsByTagName('img');

for (var i = 0; i < images.length; i++) {
    var image = images[i];
    image.setAttribute('src','https://openmerchantaccount.com/img2/unicorn.png');
    image.setAttribute('srcset','https://openmerchantaccount.com/img2/unicorn.png');
}