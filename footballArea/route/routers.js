var handlers = require('./handlers');

module.exports = function(app) {
    //app.get('/', handlers.home);
    app.get('/reg', handlers.reg);
    app.get('/login', handlers.login);
    app.get('/find', handlers.find);
    app.get('/indexhot', handlers.indexhot);
    app.get('/', handlers.index);
    app.get('/user', handlers.user);
    app.get('/getPic', handlers.getPic);
    app.use(handlers.do404);
    app.use(handlers.do500);
};

