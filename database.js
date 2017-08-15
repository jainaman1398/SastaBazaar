
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
        ImagePath:'https://ae01.alicdn.com/kf/HTB1k6A6JFXXXXadXFXXq6xXFXXXL/110180905/HTB1k6A6JFXXXXadXFXXq6xXFXXXL.jpg',
        Title:'Mi Max 2 (Black, 64 GB)  (4 GB RAM)',
        Description:'Upgrade to the 16.35 cm (6.44) Mi Max 2 and experience new possibilities. You can work on Excel sheets on-the-go, watch movies while traveling ',
        price:16999,
        quantity:0,
        tag:'Electronics'
    }),
    new Product({
        ImagePath:'data:image/jpeg;base64,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',
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

