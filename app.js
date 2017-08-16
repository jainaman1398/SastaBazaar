var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var nodemailer=require('nodemailer');
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
var User=require('./models/signin');
var done=require('./models/done');
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

app.get('/checkout',function (req,res) {
    res.render('check');
})

function mail(receiver) {
   var yo=1;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sastabazaar13@gmail.com',
            pass: 'bazaarsasta'
        }
    });

    var mailOptions = {
        from: 'sastabazaar13@gmail.com',
        to: receiver,
        subject: 'Greetings from SastaBazaar',
        text: 'Your Order Summary on your Profile'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            yo=0;
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    return yo;
}

app.post('/checkout',function (req,res,next) {


    order.find({user:req.user},function (err,docs) {
        if (err)
            throw err;
        aj = docs[0].Cart_item;
        var yoyo = new done({
        Name : req.body.name,
        Address : req.body.address,
        Mobile_No : req.body.contactno,
            Mail:req.body.mail,
        user : req.user,
        Carting : aj
    });
        if(mail(req.body.mail)!=1)
            quit();
  yoyo.save(function (err) {
      if(err)
          throw err;
  })
        docs[0].Cart_item = {};
        docs[0].user = req.user;
        docs[0].save(function (err) {
            if (err)
                throw err;
        })

    });

    res.redirect('/')
})

app.get('/logout',function (req,res,next) {
    req.logout();
    res.redirect('/');
});

app.get('/profile',islogged,function (req,res) {
    done.find({user:req.user},function (err,docs) {
        if(err)
            throw err;

        res.render('profile',{item:docs});
    })

})

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

function fun(y){

    User.findOne({Email:y},function (err,dosc) {
        if(err)
            throw err;
        var password=dosc.password;


    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sastabazaar13@gmail.com',
            pass: 'bazaarsasta'
        }
    });

    var mailOptions = {
        from: 'sastabazaar13@gmail.com',
        to: y,
        subject: 'Your Sasta Account password details',
        text: password
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    })
}

app.get('/recovery',function (req,res,next) {
    res.render('recovery');
})

app.post('/recovery',function (req,res,next) {
    var y=req.body.r_mail;
    fun(y);
    res.redirect('/');
});


function islogged(req,res,next) {
    if(req.isAuthenticated()){
        next();
    }
    else{
        res.redirect('/signin')
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


app.listen(23456,function () {
    console.log("server @ https://localhost:23456");
});

