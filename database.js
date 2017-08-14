
var Product=require('./models/users');


var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:23456/myapp');

var products=[
    new Product({
    ImagePath:'https://rukminim1.flixcart.com/image/832/832/computer/d/a/q/lenovo-ideapad-notebook-original-imaehqzf69yfv3ag.jpeg?q=70',
    Title:'Lenovo Ideapad 500s Core i5 6th Gen',
        Description:'4 GB/1 TB HDD/Windows 10 Home/2 GB Graphics) 500S-14ISK Notebook  (14 inch, Silver, 1.68 kg)',
        price:54500,
        quantity:5,
        tag:'Electronics'
    }),
    new Product({
        ImagePath:'https://rukminim1.flixcart.com/image/832/832/top/t/q/c/tsf400626-the-vanca-m-original-imaegbvjrvshha3g.jpeg?q=70',
        Title:'The Vanca Casual Sleeveless Printed Women\'s Blue Top',
        Description: 'Tank top in indigo print with lace overlay at side panels',
        price:1500,
        quantity:10,
        tag:'Clothing'
    }),
    new Product({
        ImagePath:'https://rukminim1.flixcart.com/image/832/832/j5ihlzk0/mobile/f/e/7/mi-max-2-d4-original-imaew6jfzdxmg3d6.jpeg?q=70',
        Title:'Mi Max 2 (Black, 64 GB)  (4 GB RAM)',
        Description:'Upgrade to the 16.35 cm (6.44) Mi Max 2 and experience new possibilities. You can work on Excel sheets on-the-go, watch movies while traveling ',
        price:16999,
        quantity:0,
        tag:'Electronics'
    }),
    new Product({
        ImagePath:'https://rukminim1.flixcart.com/image/832/832/home-theatre-system/g/c/h/kt-jumbobt-krisons-original-imaejfa6kpr22v3r.jpeg?q=70',
        Title:'KRISONS KT-JUMBOBT 4.1 Tower Speaker  (MP3)',
        Description:'In The Box\n' +
        '1 WOOFER, 4 SATTELITE SPEAKER, 1 REMOTE, 1 AUX CABLE ,2 EXTENEION WIRES AND BATTERY',
        price:7999,
        quantity:3,
        tag:'Electronics'
    }),
    new Product({
        ImagePath:'https://rukminim1.flixcart.com/image/832/832/backpack/h/y/q/bpbra4blu-skybags-backpack-brat-4-original-imaebptpgwp4kcdz.jpeg?q=70',
        Title:'Skybags Brat 4 Backpack  (Blue)',
        Description:'The bag is simple yet very stylish. You roam around in campus and all eyes are on your bag, just saying. Have been using it roughly for more than a year now,',
        price:800,
        quantity:25,
        tag:'Bags'
    })
];

var done=0;
for(var i=0;i<products.length;i++)
{
    console.log("aj")
    let t=new Product(products[i]);
    t.save(function () {
        done++;
        if(done==products.length)
        {
            exit();
        }
    })
}

function exit() {

    mongoose.disconnect();
}
Product.find(function (err,docs) {
   //console.log(docs);
})
//module.exports=products;

