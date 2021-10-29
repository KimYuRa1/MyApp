const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product')

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) { //destination : 파일 저장 위치 
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) { //filename  : 업로드 될 파일 이름 짓기
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })

var upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {
    
    //가져온 이미지를 저장해준다.
    upload(req, res, err =>{
        if(err){
            return req.json({success : false, err})
        }
        return res.json({success : true, filePath: res.req.file.path, fileName:res.req.file.filename})

    })

})

router.post('/', (req, res) => { // app.use('/api/produdct')> Axios.post("/api/product")>> ("/")로 post request
    
  //받아온 정보들을 db에 넣어준다(uploadproductPage.js에서 보내준 정보들을 DB에 저장)
  const product = new Product(req.body)

  product.save((err) => {
    if(err) return res.status(400).json({ success : false, err})
    return res.status(200).json({success: true})
  })

})


router.post('/products', (req, res) => {
    
  //product collection에 들어있는 모든 상품 정보를 가져오기

  Product.find() //위의 모델을 이용하여 find라는 메소드 사용
    .populate("writer") // writer라는 사람에 대한 모든 정보를 가져옴
    .exec((err, productInfo) => {
      if(err) return res.status(400).json({ success : false, err})
      return res.status(200).json({success : true , productInfo})
    })

})


module.exports = router;
