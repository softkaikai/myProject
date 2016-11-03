function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


var host = 'https://cnodejs.org/api/v1';
var topics = '/topics';
var topic = '/topic/';

function getTopic(topicData) {
  if(!topicData) {
    return host + topics;
  } else {
    return host + topic + topicData;
  }
}


module.exports = {
  formatTime: formatTime,
  getTopic: getTopic
}
