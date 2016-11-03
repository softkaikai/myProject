var app = getApp();

Page({
    data: {
        idc: 'clear',
        idb: 'back',
        idh: 'history',
        idadd: '+',
        idminus: '-',
        idmul: '*',
        iddivi: '/',
        idequal: '=',
        iddian: '.',
        id9: '9',
        id8: '8',
        id7: '7',
        id6: '6',
        id5: '5',
        id4: '4',
        id3: '3',
        id2: '2',
        id1: '1',
        id0: '0',
        // screenData: '52.3-5.03+5/3*2',
        screenData: '4-3+2',
        num: [],
        operator: []
    },
    tap: function(eve) {
         console.log(eve.target);
        var id = eve.target.id;
        if(id == this.data.idb) {//后退
            var data = this.data.screenData;
            if(!data) {
                return;
            }
            data = data.substring(0, data.length-1);
            // if(data == '') {
            //     data = '0';    
            // }
            this.setData({
                screenData: data
            });
        } else if(id == this.data.idc) {//清屏
            this.setData({
                screenData: ''
            });
        } else if(id == this.data.idequal) {
            var data = this.data.screenData;
            var regNum = /\d+\.\d+|\d+/igm;
            var regOperator = /\+|\*|-|\//igm;
            var resultNum = data.match(regNum);
            var resultOperator = data.match(regOperator);
            var result = 0;
            // console.log(resultOperator);
            for(var i = 0; i < resultNum.length; i++) {
                resultNum[i] = parseFloat(resultNum[i]);
            } 
            if(isNaN(data.charAt(0))) {
                resultNum.unshift(0);
            }
            if(resultOperator.length + 1 == resultNum.length) {
                console.log('开始计算');
                var count = 0;
                while(resultOperator.length) {
                    switch(resultOperator[0]) {
                        case '+':
                            result = resultNum[0] + resultNum[1];
                            break;
                        case '-':
                            result = resultNum[0] - resultNum[1];
                            break;
                        case '*':
                            result = resultNum[0] * resultNum[1];
                            break;
                        case '/':
                            result = resultNum[0] / resultNum[1];
                            break;
                        default:
                            console.log('操作符错误');
                            break;
                    }
                    count++;
                    if(count>20) {
                        console.log('我被迫跳出循环了');
                        break;
                    }
                    resultOperator.shift();
                    resultNum.shift();
                    resultNum.shift();
                    resultNum.unshift(result);
                }
                result = result.toFixed(6);
                this.setData({
                    screenData: result + ''
                });
                console.log('计算结束');
            }
             
        } else if(id == this.data.idh) {
            return;
        } else {
            var data = this.data.screenData;
            data += id;
            this.setData({
                screenData: data
            });
        }
    }
})