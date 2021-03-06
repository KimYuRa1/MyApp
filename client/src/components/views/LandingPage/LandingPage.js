import React, {useEffect, useState} from 'react'
import { FaCode, FaSortAmountDown } from "react-icons/fa";
import axios from "axios";
import { Icon, Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';

function LandingPage() {

    const [Products, setProducts] = useState([])

    useEffect(() => {

        axios.post('/api/product/products')
        .then(response => {
            if(response.data.success){
                console.log(response.data)
                setProducts(response.data.productInfo)
            }else{
                alert("상품들을 가져오는데 실패했습니다.")
            }
        })

    }, [] )


    const renderCards =  Products && Products.map((product, index)=>{
        console.log('product', product)

        return <Col lg={6} md={8} xs={24} key={index}>
        
        <Card 
            
            cover={<img src = {`http://localhost:5000/${product.images[0]}`}/>}
        >
            <Meta 
                title={product.title}
                description={`$${product.price}`}
            />
        </Card>
        </Col>
    })

    return (
        <div style={{width : '75%', margin : '3rem auto'}}>

            <div style={{textAlign: 'center'}}>
                <h2>상점 모아보기<Icon type = "message"/></h2>
            </div>

            {/*Filter */}

            {/*Search*/}

            {/*Cards*/}
            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>
            
            
            

            

            <div style={{ display:'flex', justifyContent : 'center'}}>
                <button>더보기</button>
            </div>


        </div>
    )
}

export default LandingPage
