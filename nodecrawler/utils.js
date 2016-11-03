var fs = require('fs');


exports.mkdir =  function(folder) {
    var mkdirp = require('mkdirp');
    mkdirp('dist/' + folder, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log('wawawawawa!');
        }
    });
};

exports.write_chapter = function(chapter, content) {
    fs.writeFile('dist/0/330/' + chapter.url, content, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log('it\'s saved');
        }
    });
};

exports.write_config = function(book) {
    var content = JSON.stringify(book, null, 4);

    fs.writeFile('dist/0/330/book.json', content, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log('It\'s saved');
        }
    })
};
