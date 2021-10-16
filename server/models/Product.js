//product 모델 만들기
const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const productSchema = mongoose.Schema({

    writer : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    title : {
        type : String,
        maxlength : 50
    },
    description : {
        type : String
    },
    location : {
        type : String
    },
    phonenum : {
        type : String
    },
    businesshours : {
        type : String
    },
    menu : {
        type : String
    },
    price:{
        type : Number,
        default : 0
    },
    images : {
        type : Array,
        default : []
    },
    views : { //얼마나 봤는지
        type : Number,
        default : 0
    }

}, {timestamps : true} )






const Product = mongoose.model('Product', productSchema);

module.exports = { Product }