var mongoose = require("./index");
var Schema = mongoose.Schema;

//设计表结构
var applySchema = new Schema({
    name:{
        type:String,
        require:true
    },
    power:{
        type:String,
        require:true
    },
})

//将文档结构发布为模型并导出
module.exports = mongoose.model('Apply',applySchema)