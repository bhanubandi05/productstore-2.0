import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Table, Alert, Button } from 'react-bootstrap'
import { get } from '../components/service/ProductStoreService'




const Sales = () => {


    const [productstore, setProductStore] = useState([])
    const [status, setStatus] = useState("")
    const [userName,setUserName]  = useState("")


    const getProductStore = () => {
        get("/productStore")
            .then(res => {
                console.log(res.data)
                setProductStore(res.data)
            })
            .catch(err => console.log(err))
    }


    useEffect(() => {

        getProductStore() // called the method each time when the page is loaded

    }, [])
    

    const setData = ({productId, productName, description, quantity, price}) =>
    {
        localStorage.setItem('productId',productId)
        localStorage.setItem('productName',productName)
        localStorage.setItem('description', description)
        localStorage.setItem('quantity',quantity)
        localStorage.setItem('price',price)
        localStorage.getItem('userName',userName)
    }



    return (
        <>
                            <div class="body1">
        <div class='home'  style = {{color: 'white'}}>
            <h1>EMinds Product Store</h1>
            <p>The Best Product Store</p>
        </div>
        </div>
                            <nav class="navbar navbar-light bg-dark">
                                <h3>{}</h3>

                                   <div class="Button2">
                                   <a href="/Salesuser"><button type="submit" class="btn btn-primary">orderdetails</button></a>
                                   &ensp;
                                       <a href="/"><button type="submit" class="btn btn-primary">Logout</button></a>
                                    </div>
                            </nav>
            <Container>
                <Row>
                    <Col>
                        <Card>
                            {status.length > 0 && (<Alert variant='success'>{status}</Alert>)}
                            <Card.Body>
                                <Table striped bordered hover size="sm">
                                    <thead>
                                        <tr>
                                            <th>Product Id</th>
                                            <th>Product Name</th>
                                            <th>Quantity</th>
                                            <th>Price(Per Item)</th>
                                            <th>Action</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            productstore.map(product => {
                                                return (
                                                    <tr key={product.productId}>
                                                        <td>{product.productId}</td>
                                                        <td>{product.productName}</td>
                                                        <td>{product.quantity}</td>
                                                        <td><b>₹ </b>{product.price}</td>
                                                        <td><a href='/sale-product'>
 <Button className='btn btn-danger' onClick={() => setData(product)}>Buy Now</Button></a>
                                                        </td> 
                                                        
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>



        </>
    )
}

export default Sales
