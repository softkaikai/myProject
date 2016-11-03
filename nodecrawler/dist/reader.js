$(function() {
    var currbook = null;

    type = getQueryString('type');
    book = getQueryString('book');
    chapter = parseInt(getQueryString('chapter'));
    $('#num').val(chapter);

    $.get(type + '/' + book + '/book.json', function(data) {
        currbook = data;
        //console.log(data);

        //console.log(typeof chapter);
        pre_chapter_info = currbook.chapters[parseInt(chapter) - 1];
        chapter_info = currbook.chapters[parseInt(chapter)];
        next_chapter_info = currbook.chapters[parseInt(chapter) + 1];

        load(chapter_info);
    });

    $('.pre-page').on('click', function() {
        load(pre_chapter_info);
        changeHistory(chapter - 1);
    });
    $('.next-page').on('click', function() {
        load(next_chapter_info);
        changeHistory(chapter + 1);
    });
    $('.switch-page').on('click', function() {
        changeHistory($('#num').val());
        load(chapter_info);
    });


    function reset() {
        type = getQueryString('type');
        book = getQueryString('book');
        chapter = parseInt(getQueryString('chapter'));

        pre_chapter_info = currbook.chapters[parseInt(chapter) - 1];
        chapter_info = currbook.chapters[parseInt(chapter)];
        next_chapter_info = currbook.chapters[parseInt(chapter) + 1];
    }

    function changeHistory(pagenum) {
        history.pushState({'chapter': chapter}, '', 'reader.html?type=' + type + '&book=' + book + '&chapter=' + pagenum + '');
        reset();
        $('#num').val(chapter);
    }

    function load(currchapter) {

        $('title').text(currchapter.title);
        $('.chapter').text(currchapter.title);
        $('.content').load(type + '/' + book + '/' + currchapter.url);
    }

    function getQueryString(name) {
        var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
        if(result == null || result.length < 1) {
            result = '';
        }
        return result[1];
    }
});


