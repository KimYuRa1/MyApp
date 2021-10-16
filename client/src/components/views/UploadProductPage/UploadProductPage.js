import React, {useState} from 'react'
import {Typography, Button, Form, Input} from 'antd';
import FileUpload from '../../utils/FileUpload';
import { number } from 'yup';
import Axios from 'axios';

const {TextArea} = Input;

const Continents = [
    {key:1, value: "1"},
    {key:2, value: "2"},
    {key:3, value: "3"},
]


function UploadProductPage(props){

    const [Title, setTitle] =useState("")
    const [Description, setDescription]=useState("")
    const [Location, setLocation] =useState("")
    const [Phonenum, setPhonenum] =useState("")
    const [Businesshours, setBusinesshours] =useState("")
    const [Menu, setMenu] =useState("")
    const [Price, setPrice] = useState(0)
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])


    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const locationChangeHandler = (event) => {
        setLocation(event.currentTarget.value)
    }

    const phonenumChangeHandler = (event) => {
        setPhonenum(event.currentTarget.value)
    }

    const businesshoursChangeHandler = (event) => {
        setBusinesshours(event.currentTarget.value)
    }

    const menuChangeHandler = (event) => {
        setMenu(event.currentTarget.value)
    }

    const continentChangeHandler = (event) => {
        setContinent(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }

    const updateImages = (newImages) =>{
        setImages(newImages)
    }

    const submitHandler = (event) =>{
        event.preventDefault(); // 확인버튼 누를 시 자동적으로 refresh되는 것을 막음

        {/*유효성 검사 : 모든 칸이 채워지지 않으면 submit 불가 */}
        if(!Title || !Description || !Location || !Phonenum || !Businesshours || !Menu || !Price || !Continent || !Images){
            return alert("모든 칸을 작성하셔야 합니다.")
        }

        //서버에 채운 값들을 request로 보낸다
           
        const body ={
            //로그인 된 사람의 ID :redux에서 가져 온 현재 로그인 된 사람의 ID정보 넣어주기
            //or . hoc 컴포넌트 > auth.js 에서 user의 모든 정보 가져오기
            writer: props.user.userData._id,
            title : Title,
            description : Description,
            location : Location,
            phonenum : Phonenum ,
            businesshours : Businesshours,
            menu : Menu,
            price : Price,
            continents : Continent,
            images : Images
        }

        Axios.post("/api/product", body) //백엔드로 보냄
        .then(response => {
            if(response.data.success){
                alert('상품 업로드에 성공했습니다!')
                props.history.push('/') //landing page로 이동
            }
            else {
                alert('상품 업로드에 실패했습니다.')
            }
        })
    }



    return(
        <div style={{maxWidth: '700px', margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
                <h2>신규 장소 등록</h2>
            </div>

            <Form onSubmit={submitHandler}>
                
                {/*드랍존*/}
                {/*파일 데이터를 uploadFile 컴포넌트에서 부모 컴포넌트로 업데이트*/}
                <FileUpload refreshFunction={updateImages} />

            <br />
            <br />
            <label>가게명</label>
            <Input onChange={titleChangeHandler} value={Title} />
            <br />
            <br />
            <label>설명</label>
            <TextArea onChange={descriptionChangeHandler} value={Description} />
            <br />
            <br />
            <label>위치</label>
            <TextArea onChange={locationChangeHandler} value={Location} />
            <br />
            <br />
            <label>전화번호</label>
            <Input onChange={phonenumChangeHandler} value={Phonenum}/>
            <br />
            <br />
            <label>영업시간</label>
            <Input onChange={businesshoursChangeHandler} value={Businesshours}/>
            <br />
            <br />
            <label>메뉴</label>
            <TextArea onChange={menuChangeHandler} value={Menu} />
            <br />
            <br />
            <label>가격(원)</label>
            <Input type="number" onChange={priceChangeHandler} value={Price} />
            <br />
            <br />
            <select onChange={continentChangeHandler} value={Continent}>
                {
                Continents.map(item => (
                    <option key={item.key} value={Continent}> {item.value} </option>
                ))
                }
                
            </select>
            <br />
            <br />
            <Button type="submit">
                확인
            </Button>





            </Form>
            
        </div>
    )
}

export default UploadProductPage