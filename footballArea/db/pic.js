var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var picSchema = new Schema({
    url: String,
    alt: {type:String,default:'图片无法显示'}
});
picSchema.statics.findByUrl = function(url,cb) {
    return this.find({url:url}, cb);
};

module.exports = mongoose.model('picModel', picSchema);
