var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash=require('connect-flash');
var validator=require('express-validator');
var app = express();
var Product=require('./models/users');
var Cart=require('./models/cart');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
var mongoose=require('mongoose');
var session=require('express-session')
var MongoStore=require('connect-mongo')(session);
var passport=require('passport')
mongoose.connect('mongodb://localhost:23456/myapp');
require('./passport.js');
var order=require('./models/orders');
var aj;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));

app.use(cookieParser('somesecret'));
app.use(session({
    secret: 'somesecret',
    resave: false,
    saveUninitialized: false,
    store:new MongoStore({mongooseConnection:mongoose.connection}),
    cookie:{maxAge:24*3600*1000}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

var index = require('./routes/index');

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req,res,next) {
    res.locals.login=req.isAuthenticated();
    res.locals.session=req.session;
    if(req.user) {
        order.findOne({user: req.user},function (err,docs) {
            if(err)
                throw err;
            if(!docs){
                var t=new order();
                t.user=req.user;
                t.Cart_item={};
                console.log(t);
                t.save();
            }
        })
    }
    next();
})

app.get('/logout',function (req,res,next) {
    req.logout();
    res.redirect('/');
});

app.get('/add-to-cart/:id',islogged,function (req,res) {
    console.log("haa");
    var ProductId=req.params.id;
    order.find({user:req.user},function (err,docs) {
        if(err)
            throw err;
        console.log(docs);
        console.log(typeof (docs));
        aj=docs[0].Cart_item;


        var cart=new Cart(aj?aj:{});
        Product.findById(ProductId,function (err,product) {
            if (err) {
                return res.redirect('/');
            }
            cart.add(product, product.id);
            order.find({user: req.user}, function (err, docs) {
                if (err)
                    throw err;
                docs[0].Cart_item = cart;
                docs[0].user = req.user;
                docs[0].save(function (err) {
                    if (err)
                        throw err;
                })
            })
            res.redirect('/');

        })
    });
});


app.get('/remove-from-cart/:id',islogged,function (req,res) {
    var ProductId=req.params.id;

    order.find({user:req.user},function (err,docs) {
        if(err)
            throw err;
        aj=docs[0].Cart_item;
        var cart=new Cart(aj);
        Product.findById(ProductId,function (err,product) {
            if (err) {
                return res.redirect('/');
            }
            cart.remove(product, product.id);
            order.find({user: req.user}, function (err, docs) {
                if (err)
                    throw err;
                docs[0].Cart_item = cart;
                docs[0].user = req.user;
                docs[0].save(function (err) {
                    if (err)
                        throw err;
                })
            })
            res.redirect('/');

        })
    });

})


function islogged(req,res,next) {
    if(req.isAuthenticated()){
        next();
    }
}
app.get('/shopping-cart',islogged,function (req,res) {
    var aman;
    order.find({user:req.user},function (err,docs) {
        if (err)
            throw err;
        aman = docs[0].Cart_item;
        console.log(aman);
        var cart1=(new Cart(aman?aman:{})).generateArray();
        if(aman){
            res.render('cart', {products: cart1, totalPrice: aman.totalPrice||0});}
        else{
            res.render('cart', {products: cart1, totalPrice:0});
        }
    })
});

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});


app.get('/signup',index);
app.post('/signup',index);
app.get('/signin',index);
app.post('/signin',index);

app.listen(23456,function () {
    console.log("server @ https://localhost:23456");
});

