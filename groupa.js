var mongoose = require("./index");
var Schema = mongoose.Schema;

//设计表结构
var groupaSchema = new Schema({
    memberName:{
        type:String,
        require:true
    },
    memberPower:{
        type:String,
        require:true
    },
})

//将文档结构发布为模型并导出
module.exports = mongoose.model('Groupa',groupaSchema)