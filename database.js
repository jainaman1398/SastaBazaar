
var Product=require('./models/users');


var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:23456/myapp');

var products=[
    new Product({
    ImagePath:'https://rukminim1.flixcart.com/image/832/832/computer/d/a/q/lenovo-ideapad-notebook-original-imaehqzf69yfv3ag.jpeg?q=70',
    Title:'Lenovo Ideapad 500s Core i5 6th Gen',
        Description:'4 GB/1 TB HDD/Windows 10 Home/2 GB Graphics) 500S-14ISK Notebook  (14 inch, Silver, 1.68 kg)',
        price:54500
    }),
    new Product({
        ImagePath:'https://rukminim1.flixcart.com/image/832/832/computer/d/a/q/lenovo-ideapad-notebook-original-imaehqzf69yfv3ag.jpeg?q=70',
        Title:'Lenovo Ideapad 500s Core i5 6th Gen',
        Description:'4 GB/1 TB HDD/Windows 10 Home/2 GB Graphics) 500S-14ISK Notebook  (14 inch, Silver, 1.68 kg)',
        price:54500
    }),
    new Product({
        ImagePath:'https://rukminim1.flixcart.com/image/832/832/computer/d/a/q/lenovo-ideapad-notebook-original-imaehqzf69yfv3ag.jpeg?q=70',
        Title:'Lenovo Ideapad 500s Core i5 6th Gen',
        Description:'4 GB/1 TB HDD/Windows 10 Home/2 GB Graphics) 500S-14ISK Notebook  (14 inch, Silver, 1.68 kg)',
        price:54500
    }),
    new Product({
        ImagePath:'https://rukminim1.flixcart.com/image/832/832/computer/d/a/q/lenovo-ideapad-notebook-original-imaehqzf69yfv3ag.jpeg?q=70',
        Title:'Lenovo Ideapad 500s Core i5 6th Gen',
        Description:'4 GB/1 TB HDD/Windows 10 Home/2 GB Graphics) 500S-14ISK Notebook  (14 inch, Silver, 1.68 kg)',
        price:54500
    }),
    new Product({
        ImagePath:'https://rukminim1.flixcart.com/image/832/832/computer/d/a/q/lenovo-ideapad-notebook-original-imaehqzf69yfv3ag.jpeg?q=70',
        Title:'Lenovo Ideapad 500s Core i5 6th Gen',
        Description:'4 GB/1 TB HDD/Windows 10 Home/2 GB Graphics) 500S-14ISK Notebook  (14 inch, Silver, 1.68 kg)',
        price:54500
    })
];

/*let t=new Product(products[0]);
t.save();*/
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

