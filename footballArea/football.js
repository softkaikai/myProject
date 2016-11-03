var express = require('express');
var hdbs = require('express-handlebars');


var app = new express();
app.set('port', process.env.PORT | 8000);
app.engine('html', hdbs({
    layoutDir: 'views',
    extname: 'html',
    partialsDir: ['views/template']
}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'html');
require('./route/routers')(app);



app.listen(app.get('port'), function() {
    console.log('The server is listening at port: ' + app.get('port'));
});
