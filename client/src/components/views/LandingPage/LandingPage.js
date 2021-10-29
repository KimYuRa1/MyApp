import React from 'react'
import { FaCode } from "react-icons/fa";

function LandingPage() {

    const [Products, setProducts] = useState([])

    useEffect(() => {

        axios.post('/api/product/products')
        .then(response => {
            if(response.data.success){
                setProducts(response.data.productInfo)

            }else{
                alert("상품들을 가져오는데 실패했습니다.")
            }
        })

    }, [] )


    const RenderCards = Products.map((product, index)=>{
        console.log('product', product)

        return <card >
            <
        </card>
    })

    const renderCards = Products && Products.map( product => (

        <div>
           <Card>
            <Card.Meta />
            </Card> 
        </div>

    ))


    return (
        <>
            <div className="app">
                <FaCode style={{ fontSize: '4rem' }} /><br />
                <span style={{ fontSize: '2rem' }}>Let's Start Coding!</span>
            </div>
            <div style={{ float: 'right' }}>Thanks For Using This Boiler Plate by John Ahn</div>
        </>
    )
}

export default LandingPage
