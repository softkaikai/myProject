var app = getApp();
var cnodeApi = require('../../utils/util.js');

Page({
    data: {
        person: {},
        tab: '\n'
    },
    onLoad: function() {
        var that = this;
        wx.request({
            data: {
                tab: 'share',
                page: 1,
                limit: 20,
                mdrender: true
            },
            url: cnodeApi.getTopic(),
            method: 'get',
            success: function(data) {
                console.log('获取数据成功');
                console.log(data);
                that.setData({
                    person: data.data.data[0]
                })
                console.log(data.data.data[0])
            },
            error: function(err) {
                console.log('获取数据失败');
                console.log(err);
            }
        });
    }

})