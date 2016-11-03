width = $('html').width();
px = width/320*20 + 'px';
$('html').css('fontSize', px);


$(window).on('resize', function() {
    width = $('html').width();
    px = width/320*20 + 'px';
    $('html').css('fontSize', px);
});