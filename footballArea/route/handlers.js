var db = require('../db/db');

exports.home = function(req, res) {
    res.render('home');
};

exports.reg = function(req, res) {
    res.render('reg', {
        title: '足球圈——注册'
    });
};

exports.login = function(req, res) {
    res.render('login', {
        title: '足球圈——登录'
    });
};

exports.find = function(req, res) {
    res.render('find', {
        title: '发现',
        active2: 'active'
    });
};

exports.indexhot = function(req, res) {
    res.render('indexhot', {
        headerActive2:'header-active'
    });
};

exports.index = function(req, res) {
    res.render('index', {
        active1: 'active',
        headerActive1:'header-active'
    });
};

exports.user = function(req, res) {
    res.render('user', {
        title: '个人中心',
        active3: 'active'
    });
};

exports.getPic = function(req, res) {
    db.picModel.find(function(err, data) {
        if(err) {
            return console.log(err);
        }
        res.json(data);
    });

};

exports.do404 = function(req, res, next) {
    res.status(404);
    res.send('404 not found');
};

exports.do500 = function(err, req, res, next) {
    res.status(500);
    res.send('500 server error');
};
