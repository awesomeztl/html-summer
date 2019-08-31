var mongoose = require("./index");
var Schema = mongoose.Schema;

//设计表结构
var BookSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    message:{
        type:String
    }
})

//将文档结构发布为模型并导出
module.exports = mongoose.model('BookPost',BookSchema)