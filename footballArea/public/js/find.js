var scroll = new IScroll('.wrapper', {
    mouseWheel: true,
    scrollbars: true
});
var height = $(window).height();

//$('input').on('focus', function() {
//    $('footer').css('position','relative');
//}).on('blur', function() {
//    $('footer').css({
//        'position':'fixed',
//        'bottom': '0'
//    });
//});
//$(window).on('resize', function() {
//
//    var heightTemp = $(window).height();
//    console.log(height);
//    console.log(heightTemp);
//    if(heightTemp != height) {
//        console.log('窗口变小');
//        $('footer').css({
//            'position': 'absolute',
//            'top': height + 'px'
//        });
//    } else {
//        console.log('窗口回复');
//        $('footer').css({
//            'position':'fixed',
//            'bottom': 0
//        });
//    }
//});