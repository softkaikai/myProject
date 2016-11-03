$(function() {
    var socket = io.connect();//与服务器进行连接


    //当点击image按钮的时候触发input file按钮
    $('.imageBtn').on('click', function() {
         $('.image').trigger('click');
    });
    var realchat = new RealChat();
    realchat.init();

    //初始化emoji中表情
    for(var i = 0; i <= 80; i++) {
        $('.wrap_emoji').append('<img src="img/tusiji/'+ i +'">');
    }
    var bBtn = true;
    $('.emoji').on('click', function() {
         if(bBtn) {
             $('.wrap_emoji').show();
         } else {
             $('.wrap_emoji').hide();
         }
         bBtn = !bBtn;
    });
    //给emoji中img设置点击事件
    $('.wrap_emoji img').on('click', function() {
        var msg = $('#msg').val() + '[emoji:'+ $(this).attr('src').match(new RegExp('[0-9]+', 'g')) +']';
        $('#msg').val(msg);
        $('.wrap_emoji').hide();
        bBtn = !bBtn;
    });
    //清屏
    $('.clear').on('click', function() {
        $('.content').children().remove();
    });
});

var RealChat = function() {
    this.socket = null;
};
var myID = null;
RealChat.prototype = {
    init: function() {
        var that = this;
        this.socket = io.connect();
        $('.login').on('click', function() {
            var nickname = $('#nickname').val();
            if(nickname.length != 0) {
                that.socket.emit('login', nickname);
            } else {
                alert('输入内容不能为空');
                $('#nickname').focus();
            }
        });
        this.socket.on('nickExisted', function() {
            $('.shadow').find('p').text('The nickname have existed! Please set your name again');
        });
        this.socket.on('loginSuccess', function(nickname) {
            $('.shadow').hide();
            $('#msg').focus();
            if(!$('.username').text()) {
                $('.username').text(nickname);
            }
        });
        this.socket.on('system', function(nickname, userCount, type) {
            var msg = nickname + (type == 'login' ? ' joined' : ' left');
            that.displayMsg('system', msg, 'red');
            $('.onlineCount').text(userCount);
            //if(!$('.username').text()) {
            //    $('.username').text(nickname);
            //}
        });
        $('.send').on('click', function() {
            var msg = $('#msg').val(),
                color = $('#color').val();
            if(msg.length == 0) {
                $('#msg').focus();
            } else {
                $('#msg').val('');
                $('#msg').focus();
                that.socket.emit('sendMsg', msg, color);
                that.displayMsg('Me', msg, color);
            }
        });
        //显示新消息
        this.socket.on('newMsg', function(username, msg, color) {
            that.displayMsg(username, msg, color);
        });
        //显示新图片信息
        this.socket.on('newImg', function(username, img) {
            that.displayImg(username, img);
        });
        //当上传图片的处理函数
        $('.image').on('change', function() {
            var file = this.files[0];
            var reader = new FileReader();
            if(!reader) {
                that.displayMsg('system', 'Your browser doesn\'t support FileReader', 'red');
                $(this).val('');
                return;
            }
            //文件读取完成触发
            reader.onload = function() {
                that.displayImg('me', this.result);
                that.socket.emit('img', this.result);
                $(this).val('');
            };
            reader.readAsDataURL(file);
        });
    },
    //显示信息的函数
    displayMsg: function(user, msg, color) {
        msg = this.showEmoji(msg);
        var $p = $('<p></p>');
        var nowTime = new Date().toTimeString().substr(0, 8);
        var content = user + '<span>('+ nowTime +'):</span>' + msg;
        $p.html(content);
        //设置字体颜色
        color = color || '#000';
        $p.css('color', color);
        $p.appendTo('.content');
        $('.content').scrollTop($('.content')[0].scrollHeight);
    },
    displayImg: function(user, msg, color) {
        var $p = $('<p></p>');
        var nowTime = new Date().toTimeString().substr(0, 8);
        var content = user + '<span>('+ nowTime +'):</span>' + '<img src="'+ msg +'">';
        $p.html(content);
        //设置字体颜色
        color = color || '#000';
        $p.css('color', color);
        $p.appendTo('.content');
        $('.content').scrollTop($('.content')[0].scrollHeight);
    },
    showEmoji: function(msg) {
        var reg = /\[emoji:\d+\]/g,
            result = msg,
            match = [],
            emojiindex = 0;

        while(match = reg.exec(result)) {
            emojiindex = match[0].match(new RegExp('[0-9]+', 'g'));
            result = result.replace(match[0], '<img src="/img/tusiji/'+ emojiindex[0] +'">');
        }
        return result;
    }
};