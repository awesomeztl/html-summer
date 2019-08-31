var mongoose = require("./index");
var Schema = mongoose.Schema;

//设计表结构
var userSchema = new Schema({
    name:{
        type:String,
        require:true
    },
    password:{
        type:String
    }
})

//将文档结构发布为模型并导出
module.exports = mongoose.model('User',userSchema)